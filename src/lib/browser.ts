import { Browser, BrowserContext, CDPSession, chromium, Page } from 'playwright'

type OptionProps = {
  url: string
  domain: string
  timestamp: string
  filename: string
  pageTitle: string
  title: string
  description: string
  zip: string
  mhtml: string
  html: string
  txt: string
  pdf: string
  png: string
  json: string
}

export type WebSiteProps = {
  browser: Browser
  context: BrowserContext
  page: Page
  cdp: CDPSession
  option: OptionProps
}

export async function fetchWebPage(url: String): WebSiteProps {
  const browser = await chromium.launch({
    headless: true,
    chromiumSandbox: false,
    args: [
      // https://peter.sh/experiments/chromium-command-line-switches/
      // https://www.chromium.org/developers/how-tos/run-chromium-with-flags/
      // "--start-fullscreen",
      // '--window-size=8500,4320',
      '--start-maximized',
      '--headless=new',
      '--enable-automation',
      '--autoplay-policy=no-user-gesture-required',
      '--remote-allow-origins=*',
      '--disable-browser-side-navigation',
      '--disable-gpu',
      '--lang=en-US',
      '--disable-extensions',
      '--disable-infobars',
      '--disable-web-security',
      '--no-proxy-server',
      '--log-level=3',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-crash-reporter',
      '--disable-in-process-stack-traces',
      '--disable-logging',
      '--disable-dev-shm-usage',
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
      '--disable-blink-features=AutomationControlled',
      '--allow-insecure-localhost',
      '--allow-sandbox-debugging',
      '--site-per-process',
      '--unsafely-treat-insecure-origin-as-secure',
      '--allow-running-insecure-content',
    ],
  })

  const context = await browser.newContext({
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
  })

  const page = await context.newPage()
  const cdp = await page.context().newCDPSession(page)

  await page.goto(url, { waitUntil: 'load', timeout: 0 }) // networkidle, load, commit

  const timestamp = new Date().toISOString()
  const parsedUrl = new URL(url)
  const domain = parsedUrl.hostname
  const filename = url.replace(/[:\/?&=]/g, '_')

  const pageTitle = await page.title()
  const title = pageTitle
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '')
    .trim()
    .replace(/\s+/g, ' ')

  const description = await page
    .$eval('meta[name="description"]', el => el.content)
    .catch(() => 'No description available')

  const option: OptionProps = {
    url: url,
    domain: domain,
    timestamp: timestamp,
    filename: filename,
    pageTitle: pageTitle,
    title: title,
    description: description,
    zip: `${title}.zip`,
    mhtml: `${title}/${filename}.mhtml`,
    html: `${title}/${filename}.html`,
    txt: `${title}/${filename}.txt`,
    pdf: `${title}/${filename}.pdf`,
    png: `${title}/${filename}.png`,
    json: `${title}/${filename}.json`,
  }

  return {
    browser: browser,
    context: context,
    page: page,
    cdp: cdp,
    option: option,
  }
}
