import { Action, ActionCommand, webSiteHandler } from '@lib/handler'
export const txtCommandDescription = 'save website <URL> as single TXT file'

export async function txtCommand(url, options) {
  const command: ActionCommand = { url: url, action: Action.TXT }
  await webSiteHandler(command)
}
