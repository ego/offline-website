import fs from 'fs'
import fsPromises from 'fs/promises'

import { Option } from 'commander'
import { COMPRESSION_LEVEL, zip } from 'zip-a-folder'

import { fetchWebPage, WebSiteProps } from '@lib/browser'
import { fixIframes } from '@lib/iframe'
import { Logger } from '@lib/logger'
import { scrollToBottom } from '@lib/scroll'
import { mediumHandler } from '@lib/website/medium.com'

export enum Action {
  MHTML,
  HTML,
  TXT,
  PDF,
  PNG,
  JSON,
  ARCHIVE,
}

export type ActionCommand = {
  url: string
  action: Action
  options: Option
}

async function mhtml(website: WebSiteProps) {
  // MHTML file.
  const { data } = await website.cdp.send('Page.captureSnapshot', { format: 'mhtml' })
  fs.writeFileSync(`${website.option.mhtml}`, data)
  Logger.debug(`${website.option.mhtml}`)
}

async function html(website: WebSiteProps) {
  // HTML file.
  const htmlContent = await website.page.content()
  fs.writeFileSync(website.option.html, htmlContent, 'utf-8')
  Logger.debug(website.option.html)
}

async function txt(website: WebSiteProps) {
  // TXT file.
  const textContent = await website.page.evaluate(() => document.body.innerText)
  fs.writeFileSync(website.option.txt, textContent, 'utf-8')
  Logger.debug(website.option.txt)
}

async function pdf(website: WebSiteProps) {
  // PDF file.
  await website.page.pdf({
    path: `${website.option.pdf}`,
    format: 'A4',
    printBackground: true,
    waitForFonts: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  })
  Logger.debug(`${website.option.pdf}`)
}

async function png(website: WebSiteProps) {
  // PNG file.
  await website.page.screenshot({
    path: `${website.option.png}`,
    fullPage: true,
  })
  Logger.debug(`${website.option.png}`)
}

async function json(website: WebSiteProps) {
  // JSON file.
  fs.writeFileSync(`${website.option.json}`, JSON.stringify(website.option, null, 2), 'utf-8')
}

async function archive(website: WebSiteProps) {
  await mhtml(website)
  await html(website)
  await txt(website)
  await pdf(website)
  await png(website)
  await json(website)

  // ZIP file.
  await zip(website.option.title, `${website.option.zip}`, {
    compression: COMPRESSION_LEVEL.high,
  })

  // Delete zipped folder.
  try {
    await fsPromises.rmdir(website.option.title, { recursive: true, force: true })
  } catch (err) {
    console.error(`Error delete ${website.option.title}:`, err)
  }

  Logger.debug(`${website.option.zip}`)
}

// Specific website processors, handler should return true if match.
const specificWebsiteHandlers = [
  mediumHandler,
  // Add here more processors.
]

export async function webSiteHandler(command: ActionCommand): Promise<void> {
  // Load page.
  let website: WebSiteProps = await fetchWebPage(command.url)

  // Specific website processors.
  let specificWebsite = false
  for (var index in specificWebsiteHandlers) {
    let specHandler = specificWebsiteHandlers[index]
    const matched = await specHandler(website)
    if (matched) {
      specificWebsite = true
      Logger.debug('Specific website processor matched.')
    }
  }

  // Base processors for all other sites.
  if (!specificWebsite) {
    await scrollToBottom(website.page)
    await fixIframes(website.page)
  }

  // Create folder for archive.
  await fsPromises.mkdir(website.option.title, { recursive: true })

  // Actions processor.
  switch (command.action) {
    case Action.ARCHIVE:
      await archive(website)
      break
    case Action.MHTML:
      await mhtml(website)
      break
    case Action.HTML:
      await html(website)
      break
    case Action.TXT:
      await txt(website)
      break
    case Action.PDF:
      await pdf(website)
      break
    case Action.PNG:
      await png(website)
      break
    case Action.JSON:
      await json(website)
      break
  }

  // Finish.
  await website.cdp.detach()
  await website.page.close()
  await website.context.close()
  await website.browser.close()
}
