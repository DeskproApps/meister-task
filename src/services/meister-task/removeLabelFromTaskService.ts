import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { TaskLabelRelation } from "./types";

const removeLabelFromTaskService = (client: IDeskproClient, labelId: TaskLabelRelation["id"]) => {
  return baseRequest(client, {
    url: `/task_labels/${labelId}`,
    method: "DELETE",
  });
};

export { removeLabelFromTaskService };
