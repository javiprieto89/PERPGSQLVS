const apiFetch = async (url, options = {}) => {
  const token = sessionStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (
    typeof options.body === 'object' &&
    options.body !== null &&
    !(options.body instanceof FormData)
  ) {
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    options.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
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

export default apiFetch;
