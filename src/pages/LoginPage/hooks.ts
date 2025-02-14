import { AUTH_URL, SCOPES } from "../../constants";
import { getAccessTokenService, getCurrentPersonService } from "../../services/meister-task";
import { getEntityListService, setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient, } from "@deskpro/app-sdk";
import type { OAuth2Result, } from "@deskpro/app-sdk";
import type { Settings, TicketData } from "../../types";

type UseLogin = () => {
  onSignIn: () => void,
  authUrl: string | null,
  error: string | null,
  isLoading: boolean,
};

const useLogin: UseLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const navigate = useNavigate()

  useInitialisedDeskproAppClient(
    async (client) => {
      const ticketId = context?.data?.ticket.id;
      if (context?.settings.use_deskpro_saas === undefined || !ticketId) {
        // Make sure settings have loaded.
        return;
      }
      const clientId = context?.settings.client_id;
      const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

      if (mode === 'local' && typeof clientId !== 'string') {
        // Local mode requires a clientId.
        return;
      }

      const oauth2 =
        mode === 'local'
          // Local Version (custom/self-hosted app)
          ? await client.startOauth2Local(
            ({ state, callbackUrl }) => {
              return `${AUTH_URL}/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${callbackUrl}&scope=${SCOPES.join(" ")}`;
            },
            /\?code=(?<code>.+?)&/,
            async (code: string): Promise<OAuth2Result> => {
              // Extract the callback URL from the authorization URL
              const url = new URL(oauth2.authorizationUrl);
              const redirectUri = url.searchParams.get("redirect_uri");

              if (!redirectUri) {
                throw new Error("Failed to get callback URL");
              }

              const data = await getAccessTokenService(client, code, redirectUri);

              return { data }
            }
          )

          // Global Proxy Service
          : await client.startOauth2Global("oZjYiXJSxuxiMg1GbUkgoOB0XvUdxKo4J9DPBFxL1Fg");

      setAuthUrl(oauth2.authorizationUrl)
      setIsLoading(false)

      try {
        const result = await oauth2.poll()
        await Promise.all([
          setAccessTokenService(client, result.data.access_token),
          result.data.refresh_token ? setRefreshTokenService(client, result.data.refresh_token) : Promise.resolve(undefined)
        ])

        let activeUser = null
        try {
          activeUser = await getCurrentPersonService(client)
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
        const entityIds = await getEntityListService(client, ticketId)

        // Only redirect if there is a user
        if (activeUser && entityIds && entityIds.length) {
          navigate("/home")
        } else {
          navigate("/link")
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsLoading(false);
      }
    },
    [setAuthUrl, context?.settings.client_id, context?.settings.use_deskpro_saas]

  );

  const onSignIn = useCallback(() => {
    setIsLoading(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onSignIn, error, isLoading };
};

export { useLogin };
