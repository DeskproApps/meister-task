import { useMemo } from "react";
import size from "lodash/size";
import filter from "lodash/filter";
import { P5, P7, Stack, Checkbox } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { checklistItemStatus } from "../../../services/meister-task";
import { Card, NoFound } from "../../common";
import type { FC } from "react";
import type { Checklist, ChecklistItem } from "../../../services/meister-task/types";

const Item: FC<{ item: ChecklistItem }> = ({ item }) => {
  const boxSize = 14;

  return (
    <Card style={{ marginBottom: 7 }}>
      <Card.Media>
        <Checkbox
          id={`${item.id}`}
          size={boxSize}
          disabled={true}
          checked={item.status === checklistItemStatus.COMPLETED}
        />
      </Card.Media>
      <Card.Body size={boxSize}><P5>{item.name}</P5></Card.Body>
    </Card>
  );
}

const CheckList: FC<{
  checklist: Checklist,
  checklistItems: ChecklistItem[],
}> = ({ checklist, checklistItems }) => {
  const items = useMemo(() => {
    return filter(checklistItems, { checklist_id: checklist.id });
  }, [checklistItems, checklist]);

  return (
    <div style={{ marginBottom: 10, width: "100%" }}>
      <Title as={P7} title={checklist.name} marginBottom={7} />

      {(Array.isArray(items) ? items : []).map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

const Checklists: FC<{
  checklists: Checklist[],
  checklistItems: ChecklistItem[],
}> = ({ checklists, checklistItems }) => {
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
            />
          ))
        }
      </Stack>
    </>
  );
};

export { Checklists };
