import { useState, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { useLinkedAutoComment } from "./useLinkedAutoComment";
import { useAsyncError } from "./useAsyncError";
import type { TicketContext } from "../types";
import type { Task } from "../services/meister-task/types";

export type Result = {
  isLoading: boolean,
  unlink: (task: Task) => void,
};

const useUnlinkTask = (): Result => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addUnlinkComment } = useLinkedAutoComment();
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const unlink = useCallback((task?: Task) => {
    if (!client || isEmpty(task)) {
      return;
    }

    setIsLoading(true);

    Promise.all([
      deleteEntityService(client, ticketId, `${task.id}`),
      addUnlinkComment(task.id),
    ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, navigate, addUnlinkComment, asyncErrorHandler]);

  return { isLoading, unlink };
};

export { useUnlinkTask };
