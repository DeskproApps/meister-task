import size from "lodash/size";
import { addLabelToTaskService } from "./addLabelToTaskService";
import { removeLabelFromTaskService } from "./removeLabelFromTaskService";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Label } from "./types";

const updateTaskLabelsService = (
  client: IDeskproClient,
  taskId: Task["id"],
  { add, rem }: { add: Array<Label["id"]>, rem: Array<Label["id"]> }
) => {
  return [
    ...(!size(add) ? [Promise.resolve()] : add.map(
      (labelId) => addLabelToTaskService(client, taskId, labelId),
    )),
    ...(!size(rem) ? [Promise.resolve()] : rem.map(
      (labelId) => removeLabelFromTaskService(client, labelId),
    ))
  ];
};

export { updateTaskLabelsService };
