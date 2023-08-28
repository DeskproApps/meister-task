import { baseRequest } from "./baseRequest";
import { AUTH_URL, placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const revokeAccessTokenService = (client: IDeskproClient) => {
  return baseRequest(client, {
    rawUrl: `${AUTH_URL}/revoke`,
    method: "POST",
    data: {
      client_id: placeholders.CLIENT_ID,
      client_secret: placeholders.CLIENT_SECRET,
      token: placeholders.ACCESS_TOKEN,
    },
  });
};

export { revokeAccessTokenService };
