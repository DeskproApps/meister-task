import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { ChecklistItem, ChecklistItemStatus } from "./types";

const updateChecklistItemService = (
  client: IDeskproClient,
  itemId: ChecklistItem["id"],
  status: ChecklistItemStatus,
) => {
  return baseRequest(client, {
    url: `/checklist_items/${itemId}`,
    method: "PUT",
    data: { status },
  });
};

export { updateChecklistItemService };
