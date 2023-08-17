import { match } from "ts-pattern";
import { P5 } from "@deskpro/deskpro-ui";
import { TaskStatus } from "../../../services/meister-task";
import type { FC } from "react";
import type { Task } from "../../../services/meister-task/types";

type Props = {
  status?: Task["status"],
};

const Status: FC<Props> = ({ status }) => {
  return (
    <P5>
      {match(status)
        .with(TaskStatus.OPEN, () => "Open")
        .with(TaskStatus.COMPLETED, () => "Completed")
        .with(TaskStatus.ARCHIVED, () => "Archived")
        .with(TaskStatus.TRASHED, () => "Trashed")
        .otherwise(() => "-")
      }
    </P5>
  );
};

export { Status };
