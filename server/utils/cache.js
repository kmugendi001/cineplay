class SimpleCache {
  constructor() {
    this.store = new Map()
  }

  get(key) {
    const entry = this.store.get(key)
    if (!entry) return null
    const { expiresAt, value } = entry
    if (expiresAt && Date.now() > expiresAt) {
      this.store.delete(key)
      return null
    }
    return value
  }

  set(key, value, ttlMs = 1000 * 60) {
    const expiresAt = ttlMs ? Date.now() + ttlMs : null
    this.store.set(key, { value, expiresAt })
  }

  del(key) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }
}

const cache = new SimpleCache()

export default cache
