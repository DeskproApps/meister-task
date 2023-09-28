import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, TaskLabelRelation } from "./types";

const getTaskLabelRelationsService = (
  client: IDeskproClient,
  taskId: Task["id"]
) => {
  return baseRequest<TaskLabelRelation[]>(client, {
    url: `/tasks/${taskId}/task_labels`,
  });
};

export { getTaskLabelRelationsService };
