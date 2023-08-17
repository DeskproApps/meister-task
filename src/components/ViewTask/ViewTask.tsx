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
        <Checklists checklists={checklists} checklistItems={checklistItems} />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Comments comments={comments} persons={persons} />
      </Container>
    </>
  );
};

export { ViewTask };
