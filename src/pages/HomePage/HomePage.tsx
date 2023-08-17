import { useDeskproElements, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useSetBadgeCount, useLinkedTasks } from "../../hooks";
import { useHomeDeps } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { tasks, isLoading: isLoadingTasks } = useLinkedTasks();
  const { projects, isLoading: isLoadingProjects } = useHomeDeps();
  const isLoading = [isLoadingTasks, isLoadingProjects].some(Boolean)

  useSetTitle("MeisterTask");
  useSetBadgeCount(tasks);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
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
    <Home tasks={tasks} projects={projects} />
  );
};

export { HomePage };
