import { Action, ActionCommand, webSiteHandler } from '@lib/handler'

export const pdfCommandDescription = 'save website <URL> as single PDF file'

export async function pdfCommand(url, options) {
  const command: ActionCommand = { url: url, action: Action.PDF }
  await webSiteHandler(command)
}
