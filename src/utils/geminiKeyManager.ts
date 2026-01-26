/**
 * Gemini API Key Manager
 * Handles localStorage-based key management for user-provided Gemini API keys
 * Keys are stored ONLY in the browser's localStorage, never in environment variables or backend
 */

const GEMINI_KEY_STORAGE_KEY = 'flowdo_gemini_api_key';

/**
 * Retrieves the Gemini API key from localStorage
 * @returns The stored API key, or null if not set
 */
export const getGeminiKey = (): string | null => {
  try {
    const key = localStorage.getItem(GEMINI_KEY_STORAGE_KEY);
    return key || null;
  } catch {
    console.error('Failed to retrieve Gemini API key from localStorage');
    return null;
  }
};

/**
 * Saves the Gemini API key to localStorage
 * @param key The API key to store
 */
export const setGeminiKey = (key: string): void => {
  try {
    if (key && key.trim()) {
      localStorage.setItem(GEMINI_KEY_STORAGE_KEY, key.trim());
    }
  } catch {
    console.error('Failed to save Gemini API key to localStorage');
  }
};

/**
 * Removes the Gemini API key from localStorage
 * Called when the key is invalid, expired, or quota exceeded
 */
export const removeGeminiKey = (): void => {
  try {
    localStorage.removeItem(GEMINI_KEY_STORAGE_KEY);
  } catch {
    console.error('Failed to remove Gemini API key from localStorage');
  }
};

/**
 * Checks if a Gemini API key is currently set in localStorage
 * @returns True if a key exists, false otherwise
 */
export const isGeminiKeySet = (): boolean => {
  return getGeminiKey() !== null;
};
