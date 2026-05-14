export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function removeFromStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearStorage(): void {
  localStorage.clear();
}
