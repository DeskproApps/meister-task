import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getTaskService, getTaskLabelsService } from "../../services/meister-task";
import { QueryKey } from "../../query";
import type { Task, Label } from "../../services/meister-task/types";

type UseTask = (taskId?: Task["id"]) => {
  isLoading: boolean;
  task: Task;
  labelIds: Array<Label["id"]>,
};

const useTask: UseTask = (taskId) => {
  const task = useQueryWithClient(
    [QueryKey.TASK, `${taskId}` as string],
    (client) => getTaskService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const labels = useQueryWithClient(
    [QueryKey.TASK_LABELS, `${taskId}` as string],
    (client) => getTaskLabelsService(client, taskId as Task["id"]),
    {
      enabled: Boolean(taskId),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - need to fix useQueryWithClient types in the `app-sdk`
      select: (data) => data.map(({ id }) => id),
    },
  );

  return {
    isLoading: [task, labels].some(({ isFetching }) => isFetching),
    task: get(task, ["data"]) as Task,
    labelIds: (get(labels, ["data"], []) || []) as Array<Label["id"]>,
  };
};

export { useTask };
