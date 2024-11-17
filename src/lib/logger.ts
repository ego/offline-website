import pc from 'picocolors'

export class Logger {
  private static verbose: boolean = false

  static setVerbose(isVerbose: boolean) {
    this.verbose = isVerbose
  }

  static debug(message: string) {
    if (this.verbose) {
      console.debug(pc.yellow(`[DEBUG] ${message}`))
    }
  }

  static info(message: string) {
    console.log(pc.green(`[INFO] ${message}`))
  }

  static warn(message: string) {
    console.warn(pc.yellow(`[WARN] ${message}`))
  }

  static error(message: string) {
    console.error(pc.red(`[ERROR] ${message}`))
  }

  static success(message: string) {
    console.log(pc.green(`[SUCCESS] ${message}`))
  }
}
