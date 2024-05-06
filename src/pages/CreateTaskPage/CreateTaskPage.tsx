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
  useDeskproLabel,
  useLinkedAutoComment,
} from "../../hooks";
import { getEntityMetadata, getError } from "../../utils";
import { getTaskValues, getSectionId } from "../../components/TaskForm";
import { CreateTask } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { Label, Person, Project } from "../../services/meister-task/types";
import type { FormValidationSchema } from "../../components/TaskForm";

const CreateTaskPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkComment } = useLinkedAutoComment();
  const { addDeskproLabel } = useDeskproLabel();
  const { setSelectionState } = useReplyBox();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((
    values: FormValidationSchema,
    project?: { id?: Project["id"], name?: Project["name"] },
    assignee?: { id?: Person["id"], fullName?: string },
    labels?: Array<{ id?: Label["id"], name?: Label["name"] }>,
  ) => {
    if (!client || !ticketId || isEmpty(values)) {
      return Promise.resolve();
    }

    setError(null);

    return createTaskService(client, getSectionId(values), getTaskValues(values))
      .then((task) => Promise.all([
        setEntityService(client, ticketId, `${task.id}`, getEntityMetadata(task, project, assignee, labels)),
        addLinkComment(task.id),
        addDeskproLabel(task),
        setSelectionState(task.id, true, "email"),
        setSelectionState(task.id, true, "note"),
      ]))
      .then(() => navigate("/home"))
      .catch((err) => {
        const errors = getError(err?.data);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [
    client,
    ticketId,
    navigate,
    addLinkComment,
    addDeskproLabel,
    setSelectionState,
    asyncErrorHandler,
  ]);

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
