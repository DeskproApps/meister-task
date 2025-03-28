import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskproElements, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useSetBadgeCount, useLinkedTasks } from "../../hooks";
import { useHomeDeps } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";
import type { Task } from "../../services/meister-task/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { tasks, isLoading: isLoadingTasks } = useLinkedTasks();
  const { projects, isLoading: isLoadingProjects } = useHomeDeps();
  const isLoading = [isLoadingTasks, isLoadingProjects].some(Boolean)

  const onNavigateToTask = useCallback((taskId: Task["id"]) => {
    navigate(`/task/view/${taskId}`);
  }, [navigate]);

  useSetTitle("MeisterTask");
  useSetBadgeCount(tasks);

  useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
    clearElements();
    deRegisterElement("edit")
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: {
          type: "logout",
        },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home tasks={tasks} projects={projects} onNavigateToTask={onNavigateToTask} />
  );
};

export { HomePage };
