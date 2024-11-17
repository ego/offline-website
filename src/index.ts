#!/usr/bin/env bun

import { Command } from 'commander'

import { Logger } from '@lib/logger'
import pkg from '../package.json'

import { archiveCommand, archiveCommandDescription } from './commands/archive-command'
import { mhtmlCommand, mhtmlCommandDescription } from './commands/mhtml-command'
import { pdfCommand, pdfCommandDescription } from './commands/pdf-command'
import { pngCommand, pngCommandDescription } from './commands/png-command'
import { txtCommand, txtCommandDescription } from './commands/txt-command'

async function main() {
  const offlineWebsiteCLIProgram = new Command()
  offlineWebsiteCLIProgram
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .option('--verbose', 'Enable verbose output for debugging')
    .hook('preAction', (thisCommand, actionCommand) => {
      const options = offlineWebsiteCLIProgram.opts()
      const url = actionCommand.args[0]
      Logger.setVerbose(options.verbose || false)
      Logger.debug('Verbose mode activated globally')
      Logger.debug(`Processing URL: ${url}`)
    })
    .hook('postAction', () => {
      Logger.debug('Done processing URL.')
    })

  const websiteURLArg = 'website <URL>'

  offlineWebsiteCLIProgram
    .command('archive', { isDefault: true })
    .description(archiveCommandDescription)
    .argument('<URL>', websiteURLArg)
    .action(archiveCommand)

  offlineWebsiteCLIProgram
    .command('mhtml')
    .description(mhtmlCommandDescription)
    .argument('<URL>', websiteURLArg)
    .action(mhtmlCommand)

  offlineWebsiteCLIProgram
    .command('pdf')
    .description(pdfCommandDescription)
    .argument('<URL>', websiteURLArg)
    .action(pdfCommand)

  offlineWebsiteCLIProgram
    .command('png')
    .description(pngCommandDescription)
    .argument('<URL>', websiteURLArg)
    .action(pngCommand)

  offlineWebsiteCLIProgram
    .command('txt')
    .description(txtCommandDescription)
    .argument('<URL>', websiteURLArg)
    .action(txtCommand)

  await offlineWebsiteCLIProgram.parseAsync(process.argv)
}

main().catch(err => {
  Logger.error(`An error occurred: ${err.message}`)
})
