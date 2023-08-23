import { useParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useTask } from "./hooks";
import { ViewTask } from "../../components";
import type { FC } from "react";

const ViewTaskPage: FC = () => {
  const { taskId } = useParams();
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

  useSetTitle(task.token);

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink task",
        payload: { type: "unlink", task },
      }],
    });
  }, [task]);

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
    />
  );
};

export { ViewTaskPage };
