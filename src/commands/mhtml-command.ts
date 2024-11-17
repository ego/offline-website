import { Action, ActionCommand, webSiteHandler } from '@lib/handler'

export const mhtmlCommandDescription = 'save website <URL> as single MHTML file'

export async function mhtmlCommand(url, options) {
  const command: ActionCommand = { url: url, action: Action.MHTML }
  await webSiteHandler(command)
}
