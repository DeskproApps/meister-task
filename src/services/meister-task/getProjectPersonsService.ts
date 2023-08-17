import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Person, Project } from "./types";

const getProjectPersonsService = (client: IDeskproClient, projectId: Project["id"]) => {
  return baseRequest<Person[]>(client, {
    url: `/projects/${projectId}/persons`,
  });
};

export { getProjectPersonsService };
