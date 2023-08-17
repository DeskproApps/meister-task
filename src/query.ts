import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

enum QueryKey {
  TASK = "task",
  TASKS = "tasks",
  PROJECTS = "projects",
  LINKED_TASKS = "linkedTasks",
}

export { queryClient, QueryKey };
