import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import size from "lodash/size";
import cloneDeep from "lodash/cloneDeep";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import {
  useSetTitle,
  useAsyncError,
  useLinkedAutoComment,
} from "../../hooks";
import { filterTasks } from "../../utils";
import { useSearchTasks } from "./hooks";
import { LinkTasks } from "../../components";
import type { FC } from "react";
import type { TicketContext } from "../../types";
import type { Task, Project } from "../../services/meister-task/types";

const LinkTasksPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkComment } = useLinkedAutoComment();
  const { asyncErrorHandler } = useAsyncError();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project["id"]>();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const { tasks, projects, isLoading } = useSearchTasks(selectedProject);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onChangeSearch = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  const onChangeSelectedIssue = useCallback((task: Task) => {
    let newSelectedTasks = cloneDeep(selectedTasks);

    if (selectedTasks.some((selectedTask) => task.id === selectedTask.id)) {
      newSelectedTasks = selectedTasks.filter((selectedTask) => {
        return selectedTask.id !== task.id;
      });
    } else {
      newSelectedTasks.push(task);
    }

    setSelectedTasks(newSelectedTasks);
  }, [selectedTasks]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onNavigateToCreate = useCallback(() => navigate("/task/create"), [navigate]);

  const onLinkTasks = useCallback(() => {
    if (!client || !ticketId || !size(selectedTasks)) {
      return;
    }

    setIsSubmitting(true);

    return Promise.all([
      ...selectedTasks.map((task) => setEntityService(client, ticketId, `${task.id}`)),
      ...selectedTasks.map((task) => addLinkComment(task.id)),
    ])
      .then(() => {
        setIsSubmitting(false);
        navigate("/home");
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, selectedTasks, addLinkComment, navigate, asyncErrorHandler]);

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
    <LinkTasks
      tasks={filterTasks(tasks, searchQuery)}
      projects={projects}
      isLoading={isLoading}
      onChangeSearch={onChangeSearch}
      selectedTasks={selectedTasks}
      onChangeSelectedTask={onChangeSelectedIssue}
      isSubmitting={isSubmitting}
      onLinkTasks={onLinkTasks}
      onCancel={onCancel}
      selectedProject={selectedProject}
      onChangeProject={setSelectedProject}
      onNavigateToCreate={onNavigateToCreate}
    />
  );
};

export { LinkTasksPage };
