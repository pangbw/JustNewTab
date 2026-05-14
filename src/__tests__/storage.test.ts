import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearStorage,
} from '@/utils/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('storage utility', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('saveToStorage', () => {
    it('should save string data to localStorage', () => {
      saveToStorage('testKey', 'testValue');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', '"testValue"');
    });

    it('should save object data as JSON', () => {
      const data = { name: 'test', count: 42 };
      saveToStorage('objKey', data);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('objKey', JSON.stringify(data));
    });

    it('should save array data as JSON', () => {
      const data = [1, 2, 3];
      saveToStorage('arrKey', data);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('arrKey', JSON.stringify(data));
    });

    it('should handle null and undefined values', () => {
      saveToStorage('nullKey', null);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('nullKey', 'null');

      saveToStorage('undefKey', undefined);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('undefKey', undefined);
    });
  });

  describe('loadFromStorage', () => {
    it('should load and parse JSON data', () => {
      const data = { name: 'test' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(data));

      const result = loadFromStorage('testKey');
      expect(result).toEqual(data);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('testKey');
    });

    it('should return default value when key does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadFromStorage('nonexistent', 'default');
      expect(result).toBe('default');
    });

    it('should return undefined when key does not exist and no default', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadFromStorage('nonexistent');
      expect(result).toBeUndefined();
    });

    it('should return default value on parse error', () => {
      localStorageMock.getItem.mockReturnValue('invalid json{');

      const result = loadFromStorage('badKey', 'fallback');
      expect(result).toBe('fallback');
    });
  });

  describe('removeFromStorage', () => {
    it('should remove item from localStorage', () => {
      removeFromStorage('testKey');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('clearStorage', () => {
    it('should clear all localStorage', () => {
      clearStorage();
      expect(localStorageMock.clear).toHaveBeenCalled();
    });
  });
});
