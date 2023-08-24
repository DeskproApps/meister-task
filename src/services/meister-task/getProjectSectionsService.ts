import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Section } from "./types";

const getProjectSectionsService = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<Section[]>(client, {
    url: `/projects/${projectId}/sections`,
  });
};

export { getProjectSectionsService };
