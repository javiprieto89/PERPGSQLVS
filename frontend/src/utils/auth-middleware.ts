// frontend/src/utils/auth-middleware.ts
/**
 * Shared authentication middleware utilities
 * Used by Apollo Client, TanStack Query, and GraphQL Client
 */

import { refreshToken } from "~/utils/api-fetch";
import { AuthHelper } from "~/utils/authHelper";
import { Referrer } from "~/utils/referrer.session";

// Track if we're currently refreshing the token to avoid multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * Handle authentication errors by attempting to refresh the token
 * Shared across all GraphQL/HTTP clients
 */
export async function handleAuthError(source = "Client"): Promise<boolean> {
  // If already refreshing, wait for that promise
  if (isRefreshing && refreshPromise) {
    if (import.meta.env.DEV) {
      console.log(`[${source}] Waiting for existing token refresh...`);
    }
    return refreshPromise;
  }

  // Start refreshing
  isRefreshing = true;

  // Save current URL to return after login if refresh fails
  Referrer.set(window.location.href);

  if (import.meta.env.DEV) {
    console.warn(`[${source}] Unauthenticated, attempting to refresh token...`);
  }

  refreshPromise = refreshToken()
    .then((success) => {
      if (success) {
        if (import.meta.env.DEV) {
          console.log(`[${source}] Token refreshed successfully`);
        }
        return true;
      } else {
        if (import.meta.env.DEV) {
          console.error(`[${source}] Token refresh failed`);
        }
        return false;
      }
    })
    .catch((error) => {
      console.error(`[${source}] Exception during token refresh:`, error);
      return false;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

/**
 * Check if an error is an authentication error (401 or UNAUTHENTICATED)
 * Works with HTTP responses, GraphQL errors, and generic errors
 */
export function isAuthError(error: unknown, response?: Response): boolean {
  if (!error) return false;

  // Check HTTP response status
  if (response && response.status === 401) {
    return true;
  }

  // Check if error has status property (HTTP error objects)
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 401
  ) {
    return true;
  }

  // Check error message
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (
      message.includes("unauthenticated") ||
      message.includes("unauthorized") ||
      message.includes("401") ||
      message.includes("not authenticated")
    ) {
      return true;
    }
  }

  // Check for GraphQL error extensions
  if (
    typeof error === "object" &&
    error !== null &&
    "extensions" in error &&
    error.extensions &&
    typeof error.extensions === "object" &&
    "code" in error.extensions &&
    error.extensions.code === "UNAUTHENTICATED"
  ) {
    return true;
  }

  return false;
}

/**
 * Check if GraphQL response contains authentication errors
 */
export function hasAuthErrors(result: {
  errors?: Array<{
    message: string;
    extensions?: { code?: string };
  }>;
}): boolean {
  if (!result.errors || result.errors.length === 0) {
    return false;
  }

  return result.errors.some((err) => {
    // Check extension code
    if (err.extensions?.code === "UNAUTHENTICATED") {
      return true;
    }
    // Check message
    const message = err.message.toLowerCase();
    return (
      message.includes("unauthenticated") ||
      message.includes("unauthorized") ||
      message.includes("not authenticated")
    );
  });
}

/**
 * Check if GraphQL errors array contains authentication errors
 * Used by Apollo Client
 */
export function hasGraphQLAuthErrors(
  errors?: ReadonlyArray<{ extensions?: { code?: string } }>
): boolean {
  if (!errors || errors.length === 0) {
    return false;
  }

  return errors.some((err) => err.extensions?.code === "UNAUTHENTICATED");
}

/**
 * Get the current authentication token
 * Wrapper around AuthHelper for consistency
 */
export function getAuthToken(): string | null {
  return AuthHelper.getToken();
}

/**
 * Get authorization header with Bearer token
 */
export function getAuthHeader(): { Authorization: string } | {} {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return AuthHelper.isAuthenticated();
}

/**
 * Development mode logging helper
 */
export function devLog(source: string, message: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    if (data !== undefined) {
      console.log(`[${source}] ${message}`, data);
    } else {
      console.log(`[${source}] ${message}`);
    }
  }
}

/**
 * Development mode warning helper
 */
export function devWarn(source: string, message: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    if (data !== undefined) {
      console.warn(`[${source}] ${message}`, data);
    } else {
      console.warn(`[${source}] ${message}`);
    }
  }
}

/**
 * Development mode error helper
 */
export function devError(source: string, message: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    if (data !== undefined) {
      console.error(`[${source}] ${message}`, data);
    } else {
      console.error(`[${source}] ${message}`);
    }
  }
}
