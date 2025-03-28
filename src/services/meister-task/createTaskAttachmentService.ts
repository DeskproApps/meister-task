import { baseRequest } from "./baseRequest";
import { IDeskproClient } from "@deskpro/app-sdk";
import type { Attachment, Task, } from "./types";

export async function createTaskAttachmentService(client: IDeskproClient, taskId: Task["id"], data: FormData,) {

  return await baseRequest<Attachment>(client, {
    url: `/tasks/${taskId}/attachments`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

