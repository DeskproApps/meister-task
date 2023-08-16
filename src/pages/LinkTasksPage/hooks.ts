import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTasksService,
  getProjectsService,
} from "../../services/meister-task";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { Task, Project } from "../../services/meister-task/types";

type UseSearchTasks = (projectId?: Maybe<Project["id"]>) => {
  isLoading: boolean,
  tasks: Task[],
  projects: Project[],
};

const useSearchTasks: UseSearchTasks = (projectId) => {
  const tasks = useQueryWithClient(
    [QueryKey.TASKS, `${projectId}`],
    (client) => getTasksService(client, { projectId }),
  );

  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  return {
    isLoading: [tasks].some(({ isFetching }) => isFetching),
    tasks: (get(tasks, ["data"], []) || []) as Task[],
    projects: (get(projects, ["data"], []) || []) as Project[],
  };
};

export { useSearchTasks };
