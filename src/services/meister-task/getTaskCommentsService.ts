import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Comment } from "./types";

const getTaskCommentsService = (client: IDeskproClient, taskId: Task["id"]) => {
  return baseRequest<Comment[]>(client, {
    url: `/tasks/${taskId}/comments`,
    queryParams: {
      sort: "-created_at",
      items: "100",
    }
  });
};

export { getTaskCommentsService };
