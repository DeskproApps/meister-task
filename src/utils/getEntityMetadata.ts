import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import type { EntityMetadata } from "../types";
import type { Task, Person, Project, Label } from "../services/meister-task/types";

const getEntityMetadata = (
  task?: Task,
  project?: { id?: Project["id"], name?: Project["name"] },
  assignee?: { id?: Person["id"], fullName?: string },
  labels?: Array<{ id?: Label["id"], name?: Label["name"] }>,
): undefined|EntityMetadata => {
  if (isEmpty(task)) {
    return;
  }

  return {
    id: `${get(task, ["id"], "")}`,
    name: get(task, ["name"], ""),
    description: get(task, ["notes"], ""),
    projectId: `${get(project, ["id"], "")}`,
    projectName: get(project, ["name"], ""),
    sectionId: `${get(task, ["section_id"], "")}`,
    sectionName: get(task, ["section_name"], ""),
    assignee: {
      id: `${get(assignee, ["id"]) || get(task, ["assigned_to_id"]) || ""}`,
        fullName: get(assignee, ["fullName"]) || get(task, ["assignee_name"]) || "",
    },
    labels: (isEmpty(labels) ? [] : labels || []).map(({ id = "", name = "" }) => ({ id: `${id}`, name })),
    dueDate: get(task, ["due"], "") || "",
  };
};

export { getEntityMetadata };
