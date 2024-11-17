import { Action, ActionCommand, webSiteHandler } from '@lib/handler'

export const pngCommandDescription = 'save website <URL> as single PNG file'

export async function pngCommand(url, options) {
  const command: ActionCommand = { url: url, action: Action.PNG }
  await webSiteHandler(command)
}
