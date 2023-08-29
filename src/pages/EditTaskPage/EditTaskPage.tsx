import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useTask } from "./hooks";
import { getEntityMetadata } from "../../utils";
import { setEntityService } from "../../services/deskpro";
import { updateTaskService, updateTaskLabelsService } from "../../services/meister-task";
import { getSectionId, getTaskValues, getLabelsToUpdate } from "../../components/TaskForm";
import { EditTask } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { MeisterTaskAPIError, Label, Person, Project } from "../../services/meister-task/types";
import type { FormValidationSchema } from "../../components/TaskForm";

const EditTaskPage: FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { isLoading, task, labelIds, labelRelations } = useTask(Number(taskId));
  const ticketId = get(context, ["data", "ticket", "id"]);

  const onCancel = useCallback(() => {
    if (!taskId) {
      return;
    }

    navigate(`/task/view/${taskId}`)
  }, [navigate, taskId]);

  const onSubmit = useCallback((
    values: FormValidationSchema,
    project?: { id?: Project["id"], name?: Project["name"] },
    assignee?: { id?: Person["id"], fullName?: string },
    labels?: Array<{ id?: Label["id"], name?: Label["name"] }>,
  ) => {
    if (!client || !taskId || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return updateTaskService(client, Number(taskId), {
      ...getTaskValues(values),
      section_id: getSectionId(values),
    })
      .then((task) => Promise.all([
        setEntityService(
          client,
          ticketId,
          `${task.id}`,
          getEntityMetadata(task, project, assignee, labels),
        ),
        updateTaskLabelsService(client, task.id, getLabelsToUpdate(labelRelations, values)),
      ]))
      .then(() => navigate(`/task/view/${taskId}`))
      .catch((err) => {
        const errors = (get(err, ["data", "errors"], []) as MeisterTaskAPIError["errors"] || [])
          .map(({ message }) => message);

        if (errors) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, taskId, ticketId, navigate, asyncErrorHandler, labelRelations]);

  useSetTitle("Edit Task");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditTask
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      task={task}
      labelIds={labelIds}
    />
  );
};

export { EditTaskPage };
