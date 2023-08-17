import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getProjectsService } from "../../services/meister-task";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { Project } from "../../services/meister-task/types";

type UseHomeDeps = (projectId?: Maybe<Project["id"]>) => {
  isLoading: boolean,
  projects: Project[],
};

const useHomeDeps: UseHomeDeps = () => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  return {
    isLoading: [projects].some(({ isFetching }) => isFetching),
    projects: (get(projects, ["data"], []) || []) as Project[],
  };
};

export { useHomeDeps };
