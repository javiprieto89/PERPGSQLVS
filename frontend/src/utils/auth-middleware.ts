// frontend/src/utils/auth-middleware.ts
/**
 * Shared authentication middleware utilities
 * Used by Apollo Client, TanStack Query, and GraphQL Client
 */
import { AuthStorage } from "~/utils/auth.storage";
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

  refreshPromise = fetchRefreshToken()
    .then((success) => {
      if (import.meta.env.DEV) {
        console.log(`[${source}] Success? ${success}`);
      }

      if (!success) {
        throw new Error("Token refresh failed");
      }

      if (import.meta.env.DEV) {
        console.log(`[${source}] Token refreshed successfully`);
      }

      return true;
    })
    .catch((error) => {
      if (import.meta.env.DEV) {
        console.error(`[${source}] Token refresh failed`, error);
      }
      return false;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
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

  return errors.some((err) => {
    const errorCode = err.extensions?.code?.toLocaleLowerCase();
    return (
      errorCode?.includes("unauthenticated") ||
      errorCode?.includes("unauthorized") ||
      errorCode?.includes("not authenticated")
    );
  });
}

/**
 * Get authorization header with Bearer token
 */
export function getAuthHeader(): { Authorization: string } | {} {
  const token = AuthStorage.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const fetchApi = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = AuthStorage.getToken();

  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (
    typeof options.body === "object" &&
    options.body !== null &&
    !(options.body instanceof FormData)
  ) {
    if (!(headers as Record<string, string>)["Content-Type"]) {
      (headers as Record<string, string>)["Content-Type"] = "application/json";
    }
    options.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_GRAPHQL_API}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Error en apiFetch:", err);
    throw err;
  }
};

export const fetchRefreshToken = async (): Promise<boolean> => {
  if (import.meta.env.DEV) {
    console.log("[RefreshToken] Starting refresh...", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthStorage.getRefreshToken()}`,
      },
      body: JSON.stringify({
        refreshToken: AuthStorage.getRefreshToken(),
      }),
    });
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          refreshToken: AuthStorage.getRefreshToken(),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthStorage.getRefreshToken()}`,
        },
      }
    );

    if (import.meta.env.DEV) {
      console.log(`[RefreshToken] response`, response);
    }

    // If server returns 401, token is invalid and cannot be refreshed
    if (response.status === 401) {
      throw new Error("Token invalid or expired (401)");
    }

    // For other non-OK responses, log and fail
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }

    // Parse response body
    let data;
    data = await response.json();

    if (import.meta.env.DEV) {
      console.log(`[RefreshToken] data`, data);
    }

    // Validate response structure
    if (!data.success || !data.token || !data.refreshToken) {
      throw new Error("Invalid response structure");
    }

    // Success - update tokens
    AuthStorage.setToken(data.token);
    AuthStorage.setRefreshToken(data.refreshToken);

    if (import.meta.env.DEV) {
      console.log("[RefreshToken] Success - tokens updated");
    }

    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("[RefreshToken] Exception during refresh:", error);
    }
    AuthStorage.logout();
    return false;
  }
};
