import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DateTime } from "../../types";
import type { Task, Person, Section, TaskStatus } from "./types";

const updateTaskService = (
  client: IDeskproClient,
  taskId: Task["id"],
  data: Partial<{
    section_id: Section["id"],
    name: Task["name"],
    notes: Task["notes"],
    status: TaskStatus,
    assigned_to_id: Person["id"],
    due: DateTime,
  }>,
) => {
  return baseRequest(client, {
    url: `/tasks/${taskId}`,
    method: "PUT",
    data,
  });
};

export { updateTaskService };
