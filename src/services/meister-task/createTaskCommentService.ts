import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Comment } from "./types";

const createTaskCommentService = (
  client: IDeskproClient,
  taskId: Task["id"],
  data: { text: Comment["text"] },
) => {
  return baseRequest<Comment>(client, {
    url: `/tasks/${taskId}/comments`,
    method: "POST",
    data,
  });
};

export { createTaskCommentService };
