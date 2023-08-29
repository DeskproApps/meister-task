import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Label, TaskLabelRelation } from "./types";

const addLabelToTaskService = (client: IDeskproClient, taskId: Task["id"], labelId: Label["id"]) => {
  return baseRequest<TaskLabelRelation>(client, {
    url: `/tasks/${taskId}/task_labels`,
    method: "POST",
    data: { label_id: labelId },
  });
};

export { addLabelToTaskService };
