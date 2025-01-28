import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTaskService,
  getProjectsService,
  getTaskLabelsService,
  getTaskCommentsService,
  getTaskChecklistsService,
  getProjectPersonsService,
  getTaskAttachmentsService,
  getTaskChecklistItemsService,
} from "../../services/meister-task";
import { QueryKey } from "../../query";
import type {
  Task,
  Label,
  Person,
  Project,
  Comment,
  Checklist,
  Attachment,
  ChecklistItem,
} from "../../services/meister-task/types";

type UseTask = (taskId?: Task["id"]) => {
  isLoading: boolean,
  task: Task,
  projects: Project[],
  comments: Comment[],
  attachments: Attachment[],
  checklists: Checklist[],
  checklistItems: ChecklistItem[],
  labels: Label[],
  persons: Person[],
};

const useTask: UseTask = (taskId) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const task = useQueryWithClient(
    [QueryKey.TASK, `${taskId}` as string],
    (client) => getTaskService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const attachments = useQueryWithClient(
    [QueryKey.TASK_ATTACH, `${taskId}` as string],
    (client) => getTaskAttachmentsService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const checklists = useQueryWithClient(
    [QueryKey.TASK_CHECKLISTS, `${taskId}` as string],
    (client) => getTaskChecklistsService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const checklistItems = useQueryWithClient(
    [QueryKey.TASK_CHECKLIST_ITEMS, `${taskId}` as string],
    (client) => getTaskChecklistItemsService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const comments = useQueryWithClient(
    [QueryKey.TASK_COMMENTS, `${taskId}` as string],
    (client) => getTaskCommentsService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const labels = useQueryWithClient(
    [QueryKey.TASK_LABELS, `${taskId}` as string],
    (client) => getTaskLabelsService(client, taskId as Task["id"]),
    { enabled: Boolean(taskId) },
  );

  const persons = useQueryWithClient(
    [QueryKey.PERSONS_BY_PROJECT, get(task, ["data", "project_id"]) as unknown as string],
    (client) => getProjectPersonsService(client, get(task, ["data", "project_id"]) as Project["id"]),
    { enabled: Boolean(get(task, ["data", "project_id"])) },
  );

  return {
    isLoading: [
      task,
      projects,
      comments,
      checklists,
      attachments,
      checklistItems,
    ].some(({ isLoading }) => isLoading),
    task: get(task, ["data"], {}) as Task,
    projects: (get(projects, ["data"], []) || []) as Project[],
    comments: (get(comments, ["data"], []) || []),
    attachments: (get(attachments, ["data"], []) || []),
    checklists: (get(checklists, ["data"], []) || []),
    checklistItems: (get(checklistItems, ["data"], []) || []),
    labels: (get(labels, ["data"], []) || []),
    persons: (get(persons, ["data"], []) || []),
  };
};

export { useTask };
