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
  TASK_ATTACH = "taskAttachments",
  TASK_CHECKLIST_ITEMS = "taskChecklistItems",
  TASK_CHECKLISTS = "taskChecklists",
  TASK_COMMENTS = "taskComments",
  TASK_LABELS = "taskLabels",
  PERSON = "person",
  PERSONS_BY_PROJECT = "personsByProject",
}

export { queryClient, QueryKey };
