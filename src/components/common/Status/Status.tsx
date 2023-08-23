import { match } from "ts-pattern";
import { P5 } from "@deskpro/deskpro-ui";
import { taskStatus } from "../../../services/meister-task";
import type { FC } from "react";
import type { Task } from "../../../services/meister-task/types";

type Props = {
  status?: Task["status"],
};

const Status: FC<Props> = ({ status }) => {
  return (
    <P5>
      {match(status)
        .with(taskStatus.OPEN, () => "Open")
        .with(taskStatus.COMPLETED, () => "Completed")
        .with(taskStatus.ARCHIVED, () => "Archived")
        .with(taskStatus.TRASHED, () => "Trashed")
        .otherwise(() => "-")
      }
    </P5>
  );
};

export { Status };
