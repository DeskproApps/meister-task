import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Details, Checklists, Comments } from "./blocks";
import type { FC } from "react";
import type {
  Task,
  Label,
  Person,
  Project,
  Comment,
  Checklist,
  Attachment,
  ChecklistItem,
  ChecklistItemStatus,
} from "../../services/meister-task/types";

type Props = {
  task: Task,
  labels: Label[],
  persons: Person[],
  projects: Project[],
  comments: Comment[],
  attachments: Attachment[],
  checklists: Checklist[],
  checklistItems: ChecklistItem[],
  onNavigateToAddComment: () => void,
  onCompleteChecklist: (itemId: ChecklistItem["id"], status: ChecklistItemStatus,) => Promise<void>,
};

const ViewTask: FC<Props> = ({
  task,
  labels,
  persons,
  projects,
  comments,
  checklists,
  attachments,
  checklistItems,
  onCompleteChecklist,
  onNavigateToAddComment,
}) => {
  return (
    <>
      <Container>
        <Details
          task={task}
          labels={labels}
          persons={persons}
          projects={projects}
          attachments={attachments}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Checklists
          checklists={checklists}
          checklistItems={checklistItems}
          onCompleteChecklist={onCompleteChecklist}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Comments
          persons={persons}
          comments={comments}
          onNavigateToAddComment={onNavigateToAddComment}
        />
      </Container>
    </>
  );
};

export { ViewTask };
