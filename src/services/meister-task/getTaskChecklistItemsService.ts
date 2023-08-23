import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, ChecklistItem } from "./types";

const getTaskChecklistItemsService = (client: IDeskproClient, taskId: Task["id"]) => {
  return baseRequest<ChecklistItem[]>(client, {
    url: `/tasks/${taskId}/checklist_items`,
  });
};

export { getTaskChecklistItemsService };
