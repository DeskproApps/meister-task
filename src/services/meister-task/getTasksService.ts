import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe } from "../../types";
import type { Task, Project } from "./types";

type Options = {
  projectId?: Maybe<Project["id"]>;
};

const getTasksService = (client: IDeskproClient, options?: Options) => {
  const { projectId } = options || {};

  const url = !projectId ? "/tasks" : `/projects/${projectId}/tasks`;

  return baseRequest<Task>(client, {
    url,
    queryParams: {
      items: "100",
    },
  });
};

export { getTasksService };
