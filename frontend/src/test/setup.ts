import "@testing-library/jest-dom/vitest";

// Mock sessionStorage for all tests
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock global window and sessionStorage for Node.js environment
Object.defineProperty(globalThis, "window", {
  value: {
    sessionStorage: mockSessionStorage,
  },
  writable: true,
  configurable: true,
});

// Also mock global for compatibility
Object.defineProperty(global, "window", {
  value: {
    sessionStorage: mockSessionStorage,
  },
  writable: true,
  configurable: true,
});
