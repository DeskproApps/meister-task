import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk"
import type { Task, Section } from "./types";

const createTaskService = (
  client: IDeskproClient,
  sectionId: Section["id"],
  data: object,
) => {
  return baseRequest<Task>(client, {
    url: `/sections/${sectionId}/tasks`,
    method: "POST",
    data,
  });
};

export { createTaskService };
