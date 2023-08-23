import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Label } from "./types";

const getTaskLabelsService = (client: IDeskproClient, taskId: Task["id"]) => {
  return baseRequest<Label[]>(client, {
    url: `/tasks/${taskId}/labels`,
  });
};

export { getTaskLabelsService };
