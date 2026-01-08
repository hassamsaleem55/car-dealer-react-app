type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method: HttpMethod;
  body?: Record<string, any> | FormData;
  authToken: string | null;
  isFormData?: boolean; // new flag
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function requestApi<T = any>(
  endpoint: string,
  { method, body, authToken, isFormData }: ApiOptions
): Promise<T> {
  if (!authToken) {
    throw new Error('Authentication token is required');
  }
  
  const url = `${BASE_URL}/api${endpoint}`;

  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(url, {
    method,
    headers,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("Content-Type") || "";
  let responseData: any;
  if (contentType.includes("application/json")) {
    responseData = await res.json();
  } else {
    responseData = await res.text();
  }

  // Optional: if your API has isSuccess
  if (responseData?.isSuccess === false) {
    const message = responseData.errorMessage || "API request failed";
    throw new Error(message);
  }

  if (!res.ok) throw new Error(responseData?.message || "API request failed");

  return responseData;
}

// Helpers
export const fetchApi = <T = any>(endpoint: string, authToken: string | null) =>
  requestApi<T>(endpoint, { method: "GET", authToken });

export const postApi = <T = any>(
  endpoint: string,
  bodyParams: Record<string, any>,
  authToken: string | null
) => requestApi<T>(endpoint, { method: "POST", body: bodyParams, authToken });

// New helper for FormData
export const postFormDataApi = <T = any>(
  endpoint: string,
  formData: FormData,
  authToken: string | null
) =>
  requestApi<T>(endpoint, {
    method: "POST",
    body: formData,
    authToken,
    isFormData: true,
  });
