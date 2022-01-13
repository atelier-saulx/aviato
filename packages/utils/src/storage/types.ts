export type Storage = {
  getItem(key: string): string | null
  removeItem(key: string): void
  setItem(key: string, value: string): void
  clear(): void
}
