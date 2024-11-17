import { Action, ActionCommand, webSiteHandler } from '@lib/handler'

export const archiveCommandDescription = 'save website <URL> as ZIP archive, default command'

export async function archiveCommand(url, options) {
  const command: ActionCommand = { url: url, action: Action.ARCHIVE }
  await webSiteHandler(command)
}
