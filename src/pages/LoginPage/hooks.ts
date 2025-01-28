import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";
import size from "lodash/size";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService, setAccessTokenService } from "../../services/deskpro";
import { getAccessTokenService, getCurrentPersonService } from "../../services/meister-task";
import { getQueryParams } from "../../utils";
import { useAsyncError } from "../../hooks";
import { AUTH_URL, SCOPES } from "../../constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { TicketContext } from "../../types";

type UseLogin = () => {
  poll: () => void,
  authUrl: string|null,
  isLoading: boolean,
};

const useLogin: UseLogin = () => {
  const key = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();
  const [callback, setCallback] = useState<OAuth2StaticCallbackUrl|undefined>();
  const [authUrl, setAuthUrl] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const clientId = useMemo(() => get(context, ["settings", "client_id"]), [context]);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  useInitialisedDeskproAppClient(
    (client) => {
        client.oauth2()
          .getGenericCallbackUrl(key, /code=(?<token>[\d\w-]+)/, /state=(?<key>.+)/)
          .then(setCallback);
    },
    [setCallback]
  );

  useEffect(() => {
    if (callback?.callbackUrl && clientId) {
      setAuthUrl(`${AUTH_URL}/authorize?${getQueryParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: callback?.callbackUrl,
        scope: SCOPES.join(" "),
        state: key,
      })}`);
    }
  }, [callback, clientId, key]);

  const poll = useCallback(() => {
    if (!client || !callback?.poll || !callback?.callbackUrl || !ticketId) {
      return;
    }

    setTimeout(() => setIsLoading(true), 1000);

    callback.poll()
      .then(({ token }) => getAccessTokenService(client, token, callback.callbackUrl))
      .then(({ access_token }) => setAccessTokenService(client, access_token))
      .then(() => getCurrentPersonService(client))
      .then(() => getEntityListService(client, ticketId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/link"))
      .catch(asyncErrorHandler);
  }, [client, callback, navigate, ticketId, asyncErrorHandler]);

  return { authUrl, poll, isLoading };
};

export { useLogin };
