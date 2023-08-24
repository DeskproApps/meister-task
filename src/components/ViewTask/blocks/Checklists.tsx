import { useMemo, useCallback } from "react";
import size from "lodash/size";
import filter from "lodash/filter";
import { P7, Stack } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { checklistItemStatus } from "../../../services/meister-task";
import { NoFound, ChecklistItem } from "../../common";
import type { FC } from "react";
import type {
  Checklist,
  ChecklistItemStatus,
  ChecklistItem as ChecklistItemType,
} from "../../../services/meister-task/types";

const CheckList: FC<{
  checklist: Checklist,
  checklistItems: ChecklistItemType[],
  onCompleteChecklist: (
    itemId: ChecklistItemType["id"],
    status: ChecklistItemStatus,
  ) => Promise<void>,
}> = ({ checklist, checklistItems, onCompleteChecklist }) => {
  const items = useMemo(() => {
    return filter(checklistItems, { checklist_id: checklist.id });
  }, [checklistItems, checklist]);

  const onComplete = useCallback((item: ChecklistItemType) => {
    const status = (item.status === checklistItemStatus.COMPLETED)
      ? checklistItemStatus.ACTIONABLE
      : checklistItemStatus.COMPLETED;
    return onCompleteChecklist(item.id, status);
  }, [onCompleteChecklist]);

  return (
    <div style={{ marginBottom: 10, width: "100%" }}>
      <Title as={P7} title={checklist.name} marginBottom={7} />

      {(Array.isArray(items) ? items : []).map((item) => (
        <ChecklistItem
          key={item.id}
          name={item.name}
          checked={item.status === checklistItemStatus.COMPLETED}
          onComplete={() => onComplete(item)}
        />
      ))}
    </div>
  );
};

const Checklists: FC<{
  checklists: Checklist[],
  checklistItems: ChecklistItemType[],
  onCompleteChecklist: (
    itemId: ChecklistItemType["id"],
    status: ChecklistItemStatus,
  ) => Promise<void>,
}> = ({ checklists, checklistItems, onCompleteChecklist }) => {
  return (
    <>
      <Title title="Checklists" />

      <Stack vertical gap={10}>
        {(!Array.isArray(checklists) || !size(checklists))
          ? <NoFound text="No checklists found"/>
          : checklists.map((checklist) => (
            <CheckList
              key={checklist.id}
              checklist={checklist}
              checklistItems={checklistItems}
              onCompleteChecklist={onCompleteChecklist}
            />
          ))
        }
      </Stack>
    </>
  );
};

export { Checklists };
