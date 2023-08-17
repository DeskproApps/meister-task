import { useCallback, useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { Title, TwoProperties } from "@deskpro/app-sdk";
import { useExternalLink } from "../../hooks";
import { format } from "../../utils/date";
import {
  Link,
  Status,
  TextWithLink,
  DeskproTickets,
  MeisterTaskLogo,
} from "../common";
import type { FC, MouseEventHandler } from "react";
import type { Task, Project } from "../../services/meister-task/types";

type Props = {
  task: Task,
  projects: Project[],
  onClickTitle?: () => void,
};

const TaskItem: FC<Props> = ({ task, projects, onClickTitle }) => {
  const { getTaskUrl, getProjectUrl } = useExternalLink();
  const project = useMemo(() => {
    return find(projects, { id: get(task, ["project_id"]) });
  }, [projects, task]);

  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(task, ["name"])
          : (<Link href="#" onClick={onClick}>{get(task, ["name"])}</Link>)
        }
        icon={<MeisterTaskLogo/>}
        link={getTaskUrl(task)}
        marginBottom={10}
      />
      <TwoProperties
        leftLabel="Project"
        leftText={(
          <TextWithLink
            text={get(project, ["name"], "-")}
            link={getProjectUrl(project)}
          />
        )}
        rightLabel="Section"
        rightText={get(task, ["section_name"], "-")}
      />
      <TwoProperties
        leftLabel="Task ID"
        leftText={get(task, ["token"], "-")}
        rightLabel="Status"
        rightText={<Status status={get(task, ["status"])} />}
      />
      <TwoProperties
        leftLabel="Date Created"
        leftText={format(get(task, ["created_at"]))}
        rightLabel="Deskpro Tickets"
        rightText={<DeskproTickets entityId={get(task, ["id"], "")} />}
      />
    </>
  );
};

export { TaskItem };
