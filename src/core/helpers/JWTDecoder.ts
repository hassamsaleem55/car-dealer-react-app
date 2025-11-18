export function decodeJwt(token: string) {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token");
  }

  const [headerB64, payloadB64] = token.split(".");
  if (!payloadB64) {
    throw new Error("Invalid JWT format");
  }

  // Helper: Base64URL decode
  const base64UrlDecode = (str: string) => {
    // Convert from Base64URL → Base64
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 to JSON string
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(json);
  };

  return {
    header: base64UrlDecode(headerB64),
    payload: base64UrlDecode(payloadB64),
  };
}


