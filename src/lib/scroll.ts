import { Page } from 'playwright'

export async function scrollToBottom(page: Page): Promise<void> {
  // Wait before starting the scrolling.
  const waitTime = 500
  await new Promise(resolve => setTimeout(resolve, waitTime))

  // Evaluate scrolling function within the page context.
  await page.evaluate(async () => {
    const timeInterval = 40
    const distance = 100 // Pixels to scroll each step.
    await new Promise<void>(resolve => {
      let totalHeight = 0
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        // Stop scrolling if we've reached the bottom.
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, timeInterval) // Time interval for each scroll step.
    })
  })

  // Wait a bit after scrolling.
  await new Promise(resolve => setTimeout(resolve, waitTime))
}
