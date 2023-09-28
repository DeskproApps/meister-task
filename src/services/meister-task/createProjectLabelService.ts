import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Label } from "./types";

const createProjectLabelService = (
  client: IDeskproClient,
  projectId: Project["id"],
  data: Pick<Label, "name"|"color">,
) => {
  return baseRequest<Label>(client, {
    url: `/projects/${projectId}/labels`,
    method: "POST",
    data,
  });
};

export { createProjectLabelService };
