import { AUTH_URL, SCOPES } from "../../constants";
import { getAccessTokenService, getCurrentPersonService } from "../../services/meister-task";
import { getEntityListService, setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient, } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import type { IOAuth2, OAuth2Result, } from "@deskpro/app-sdk";
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
  const [isPolling, setIsPolling] = useState(false);
  const [oauth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)

  const { context } = useDeskproLatestAppContext<TicketData, Settings>();

  const navigate = useNavigate()
  const ticketId = context?.data?.ticket.id;

  useInitialisedDeskproAppClient(
    async (client) => {
      if (!ticketId) {
        // Make sure settings have loaded.
        return;
      }
      const clientId = context?.settings.client_id;
      const mode = context?.settings.use_advanced_connect ? 'local' : 'global';

      if (mode === 'local' && typeof clientId !== 'string') {
        // Local mode requires a clientId.
        return;
      }

      const oauth2Response =
        mode === 'local'
          // Local Version (custom/self-hosted app)
          ? await client.startOauth2Local(
            ({ state, callbackUrl }) => {
              return `${AUTH_URL}/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${callbackUrl}&scope=${SCOPES.join(" ")}`;
            },
            /\?code=(?<code>.+?)&/,
            async (code: string): Promise<OAuth2Result> => {
              // Extract the callback URL from the authorization URL
              const url = new URL(oauth2Response.authorizationUrl);
              const redirectUri = url.searchParams.get("redirect_uri");

              if (!redirectUri) {
                throw new Error("Failed to get callback URL");
              }

              const data = await getAccessTokenService(client, code, redirectUri);

              return { data }
            }
          )

          // Global Proxy Service
          : await client.startOauth2Global("vtOs2SuoM5Yw60DTj_F3LzfVr0t3F7QMz5GZj1eahSA");

      setAuthUrl(oauth2Response.authorizationUrl)
      setOAuth2Context(oauth2Response)
    }, [setAuthUrl, context?.settings.client_id, context?.settings.use_advanced_connect]
  );

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId || !oauth2Context) {
      return
    }

    const startPolling = async () => {
      try {
        const result = await oauth2Context.poll()
        await Promise.all([
          setAccessTokenService(client, result.data.access_token),
          result.data.refresh_token ? setRefreshTokenService(client, result.data.refresh_token) : Promise.resolve(undefined)
        ])

        let activeUser = null
        try {
          activeUser = await getCurrentPersonService(client)

          if (!activeUser) {
            throw new Error()
          }
        } catch (e) {
          throw new Error("Error authenticating user")
        }
        const entityIds = await getEntityListService(client, ticketId)

        // Redirect to the homepage if the user has linked items 
        if (entityIds && entityIds.length) {
          navigate("/home")
        } else {
          navigate("/link")
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false)
        setIsPolling(false)
      }
    }

    if (isPolling) {
      startPolling()
    }
  }, [isPolling, ticketId, oauth2Context, navigate])


  const onSignIn = useCallback(() => {
    setIsLoading(true);
    setIsPolling(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onSignIn, error, isLoading };
};

export { useLogin };
