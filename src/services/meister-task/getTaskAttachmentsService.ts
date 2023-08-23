import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Attachment } from "./types";

const getTaskAttachmentsService = (client: IDeskproClient, taskId: Task["id"]) => {
  return baseRequest<Attachment[]>(client, {
    url: `/tasks/${taskId}/attachments`,
  });
};

export { getTaskAttachmentsService };
