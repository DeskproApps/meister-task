import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { createTaskService } from "../../services/meister-task";
import {
  useSetTitle,
  useReplyBox,
  useAsyncError,
  useLinkedAutoComment,
} from "../../hooks";
import { getTaskValues, getSectionId } from "../../components/TaskForm";
import { CreateTask } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { MeisterTaskAPIError } from "../../services/meister-task/types";
import type { FormValidationSchema } from "../../components/TaskForm";

const CreateTaskPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkComment } = useLinkedAutoComment();
  const { setSelectionState } = useReplyBox();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !ticketId || isEmpty(values)) {
      return Promise.resolve();
    }

    setError(null);

    return createTaskService(client, getSectionId(values), getTaskValues(values))
      .then((task) => Promise.all([
        setEntityService(client, ticketId, `${task.id}`),
        addLinkComment(task.id),
        setSelectionState(task.id, true, "email"),
        setSelectionState(task.id, true, "note"),
      ]))
      .then(() => navigate("/home"))
      .catch((err) => {
        const errors = (get(err, ["data", "errors"], []) as MeisterTaskAPIError["errors"] || [])
          .map(({ message }) => message);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, ticketId, addLinkComment, setSelectionState, asyncErrorHandler, navigate]);

  useSetTitle("Link Tasks");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateTask
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateTaskPage };
