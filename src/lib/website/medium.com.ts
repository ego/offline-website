import { Page } from 'playwright'

import { WebSiteProps } from '@lib/browser'
import { fixIframes } from '@lib/iframe'
import { scrollToBottom } from '@lib/scroll'

async function isMedium(page: Page) {
  const hasHeaderMediumLogo = await page.evaluate(() => {
    const logos = document.querySelectorAll('[data-testid=headerMediumLogo]')
    return logos.length > 0
  })

  return hasHeaderMediumLogo
}

async function closePopUp(page: Page) {
  // Close pop-up.
  await page.evaluate(() => {
    document.querySelectorAll('[data-testid=close-button]').forEach(el => {
      el.click()
      el.style.display = 'none'
    })
  })
}

async function fixPicturesImages(page: Page) {
  // On some website like medium.com playwright in a headless mode
  // images with attribute `loading` (async loaded img) is not working.
  await page.evaluate(() => {
    // Select all <picture> elements on the page.
    const pictures = document.querySelectorAll('picture')

    pictures.forEach(picture => {
      // Select all <source> elements within the <picture>.
      const sources = picture.querySelectorAll('source')
      if (sources.length > 0) {
        // Find the source with the highest quality (usually the last one).
        const highestQualitySource = sources[0]

        const srcArray = highestQualitySource.getAttribute('srcset').split(' ')
        const bestSrc = srcArray[srcArray.length - 2] // Take the first URL from the srcset.

        // Find the <img> inside the <picture> element.
        const img = picture.querySelector('img')
        if (img) {
          var imgClone = img.cloneNode(true)
          imgClone.removeAttribute('loading')
          imgClone.setAttribute('src', bestSrc)
          img.parentNode.replaceChild(imgClone, img)
        }

        sources.forEach(source => {
          source.remove()
        })
      }
    })
  })
}

export async function mediumHandler(website: WebSiteProps): boolean {
  const mediumDomain = website.option.domain.endsWith('medium.com')
  const mediumSite = await isMedium(website.page)
  if (mediumDomain || mediumSite) {
    await closePopUp(website.page)
    await fixIframes(website.page)
    await fixPicturesImages(website.page)
    await scrollToBottom(website.page)
  }
  return mediumSite
}
