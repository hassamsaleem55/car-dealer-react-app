type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method: HttpMethod;
  body?: Record<string, any>;
  authToken: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function requestApi<T = any>(
  endpoint: string,
  { method, body, authToken }: ApiOptions
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseData = await res.json();
  const isSuccess = responseData.isSuccess;
  if (!isSuccess) {
    const message = `API Error (${res.status}): ${res.statusText}`;
    console.error(message);
    throw new Error(message);
  }

  return responseData;
}

export const fetchApi = <T = any>(endpoint: string, authToken: string) =>
  requestApi<T>(endpoint, { method: "GET", authToken });

export const postApi = <T = any>(
  endpoint: string,
  bodyParams: Record<string, any>,
  authToken: string
) => requestApi<T>(endpoint, { method: "POST", body: bodyParams, authToken });
