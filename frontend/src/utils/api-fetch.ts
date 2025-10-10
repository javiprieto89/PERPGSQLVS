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
  const res = await fetch(`${import.meta.env.VITE_GRAPHQL_API}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();
    AuthHelper.setToken(data.access_token);
    return true;
  }
  AuthHelper.deleteToken();
  return false;
};
