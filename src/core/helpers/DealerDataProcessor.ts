import { decodeJwt } from "./JWTDecoder";

export async function getDealerData() {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/website-auth`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Token: import.meta.env.VITE_DEALER_TOKEN,
    }),
  });
  const tokens = await res.json();
  const authToken = tokens.authToken;
  const infoToken = tokens.infoToken;
  const decodedInfoToken = decodeJwt(infoToken);
  console.log("Decoded Info Token Payload:", decodedInfoToken.payload);
  const parsedPayload = dealerDataParser(decodedInfoToken.payload);

  return {
    authToken: authToken,
    dealerData: parsedPayload.dealerData,
  };
}

function dealerDataParser(payload: any) {
  // Parse nested userdata JSON if present
  const dealerDataKey =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata";

  if (payload[dealerDataKey]) {
    try {
      payload.dealerData = JSON.parse(payload[dealerDataKey]);
    } catch (err) {
      console.warn("Could not parse userdata JSON", err);
    }
  }

  return payload;
}
