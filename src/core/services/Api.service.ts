// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// interface ApiOptions {
//   method: HttpMethod;
//   body?: Record<string, any>;
//   authToken: string;
// }

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// async function requestApi<T = any>(
//   endpoint: string,
//   { method, body, authToken }: ApiOptions
// ): Promise<T> {
//   const url = `${BASE_URL}/api${endpoint}`;

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };

//   if (authToken) headers.Authorization = `Bearer ${authToken}`;

//   const res = await fetch(url, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const responseData = await res.json();
//   const isSuccess = responseData.isSuccess;
//   if (!isSuccess) {
//     const message = responseData.errorMessage || "API request failed";
//     throw new Error(message);
//   }

//   return responseData;
// }

// export const fetchApi = <T = any>(endpoint: string, authToken: string) =>
//   requestApi<T>(endpoint, { method: "GET", authToken });

// export const postApi = <T = any>(
//   endpoint: string,
//   bodyParams: Record<string, any>,
//   authToken: string
// ) => requestApi<T>(endpoint, { method: "POST", body: bodyParams, authToken });

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method: HttpMethod;
  body?: Record<string, any> | FormData;
  authToken: string;
  isFormData?: boolean; // new flag
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function requestApi<T = any>(
  endpoint: string,
  { method, body, authToken, isFormData }: ApiOptions
): Promise<T> {
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
export const fetchApi = <T = any>(endpoint: string, authToken: string) =>
  requestApi<T>(endpoint, { method: "GET", authToken });

export const postApi = <T = any>(
  endpoint: string,
  bodyParams: Record<string, any>,
  authToken: string
) => requestApi<T>(endpoint, { method: "POST", body: bodyParams, authToken });

// New helper for FormData
export const postFormDataApi = <T = any>(
  endpoint: string,
  formData: FormData,
  authToken: string
) =>
  requestApi<T>(endpoint, {
    method: "POST",
    body: formData,
    authToken,
    isFormData: true,
  });
