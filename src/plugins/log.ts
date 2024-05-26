export default class Log {
  static error(msg: string, obj: object) {
    console.error(`[ERROR]: ${msg} ${obj}`)
  }

  static warn(msg: string, obj: object) {
    console.warn(`[WARN]: ${msg} ${obj}`)
  }

  static trace(msg: string, obj: object) {
    console.trace(`[TRACE]: ${msg} ${obj}`)
  }

  static info(msg: string, obj: object) {
    console.log(`[INFO]: ${msg} ${obj}`)
  }

  static debug(msg: string, obj: object) {
    console.debug(`[DEBUG]: ${msg} ${obj}`)
  }
}
