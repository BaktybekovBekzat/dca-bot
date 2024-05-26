export default class LocalStorage {
  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key)

    if (!item) return null

    return JSON.parse(item)
  }

  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static remove(key: string): void {
    localStorage.removeItem(key)
  }
}
