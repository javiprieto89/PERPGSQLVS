import { AuthHelper } from "./authHelper";

export const apiFetch = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = AuthHelper.getToken();

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

export const refreshToken = async (): Promise<boolean> => {
  if (import.meta.env.DEV) {
    console.log("[RefreshToken] Starting refresh...");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/refresh`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        refreshToken: AuthHelper.getRefreshToken(),
      }),
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AuthHelper.getRefreshToken()}`,
      },
    });

    // If server returns 401, token is invalid and cannot be refreshed
    if (res.status === 401) {
      if (import.meta.env.DEV) {
        console.error("[RefreshToken] Token invalid or expired (401)");
      }
      AuthHelper.logout();
      return false;
    }

    // For other non-OK responses, log and fail
    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.error(`[RefreshToken] Failed - Status: ${res.status}`);
      }
      AuthHelper.logout();
      return false;
    }

    // Parse response body
    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("[RefreshToken] Failed to parse response:", parseError);
      AuthHelper.logout();
      return false;
    }

    // Validate response structure
    if (!data.success || !data.token || !data.refreshToken) {
      if (import.meta.env.DEV) {
        console.error("[RefreshToken] Invalid response structure:", data);
      }
      AuthHelper.logout();
      return false;
    }

    // Success - update tokens
    AuthHelper.setToken(data.token);
    AuthHelper.setRefreshToken(data.refreshToken);
    
    if (import.meta.env.DEV) {
      console.log("[RefreshToken] Success - tokens updated");
    }
    
    return true;
  } catch (error) {
    console.error("[RefreshToken] Exception during refresh:", error);
    AuthHelper.logout();
    return false;
  }
};
