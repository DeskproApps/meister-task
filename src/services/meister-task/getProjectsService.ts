import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project } from "./types";

const getProjectsService = (client: IDeskproClient) => {
  return baseRequest<Project>(client, {
    url: "/projects",
    queryParams: {
      items: "100",
    },
  })
};

export { getProjectsService };
