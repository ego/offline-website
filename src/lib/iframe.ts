import { Page } from 'playwright'

export async function fixIframes(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.setAttribute(
        'sandbox',
        'allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation',
      )
    })
  })
}
