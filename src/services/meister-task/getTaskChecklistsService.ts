import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Checklist } from "./types";

const getTaskChecklistsService = (client: IDeskproClient, taskId: Task["id"]) => {
  return baseRequest<Checklist[]>(client, {
    url: `/tasks/${taskId}/checklists`,
  });
};

export { getTaskChecklistsService };
