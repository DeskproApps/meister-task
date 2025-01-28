import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { useQueryWithClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useQueriesWithClient } from "./useQueriesWithClient";
import { getEntityListService } from "../services/deskpro";
import { getTaskService } from "../services/meister-task";
import { QueryKey } from "../query";
import type { TicketContext } from "../types";
import type { Task } from "../services/meister-task/types";

type UseLinkedTasks = () => {
  isLoading: boolean;
  tasks: Task[];
};

const useLinkedTasks: UseLinkedTasks = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = get(context, ["data", "ticket", "id"]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_TASKS],
    (client) => ticketId ? getEntityListService(client, ticketId) : Promise.resolve([]),
    { enabled: Boolean(ticketId) },
  );

  const fetchedTasks = useQueriesWithClient((get(linkedIds, ["data"], []) || []).map((taskId) => {
    return {
      queryKey: [QueryKey.TASK, taskId],
      queryFn: (client) => getTaskService(client, Number(taskId)),
      enabled: Boolean(size(linkedIds)),
      useErrorBoundary: false,
    }
  }));

  const tasks = useMemo(() => {
    return fetchedTasks.map(({ data }) => data).filter(Boolean)
  }, [fetchedTasks]);

  return {
    isLoading: [linkedIds, ...fetchedTasks].some(({ isFetching }) => isFetching),
    tasks: tasks as Task[],
  };
};

export { useLinkedTasks };
