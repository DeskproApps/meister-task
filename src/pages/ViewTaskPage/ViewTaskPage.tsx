import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { queryClient } from "../../query";
import { updateChecklistItemService } from "../../services/meister-task";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useTask } from "./hooks";
import { ViewTask } from "../../components";
import type { FC } from "react";
import type { ChecklistItem, ChecklistItemStatus } from "../../services/meister-task/types";

const ViewTaskPage: FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const {
    task,
    labels,
    persons,
    projects,
    comments,
    isLoading,
    checklists,
    attachments,
    checklistItems,
  } = useTask(Number(taskId));

  const onCompleteChecklist = useCallback((
    itemId: ChecklistItem["id"],
    status: ChecklistItemStatus,
  ) => {
    if (!client) {
      return Promise.resolve();
    }

    return updateChecklistItemService(client, itemId, status)
      .then(() => queryClient.invalidateQueries())
      .catch(asyncErrorHandler);
  }, [client, asyncErrorHandler]);

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/task/view/${taskId}/comments/create`);
  }, [navigate, taskId]);

  useSetTitle(task.token);

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: `/task/edit/${taskId}` }
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink task",
        payload: { type: "unlink", task },
      }],
    });
  }, [taskId, task]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewTask
      task={task}
      labels={labels}
      persons={persons}
      projects={projects}
      comments={comments}
      attachments={attachments}
      checklists={checklists}
      checklistItems={checklistItems}
      onCompleteChecklist={onCompleteChecklist}
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewTaskPage };
