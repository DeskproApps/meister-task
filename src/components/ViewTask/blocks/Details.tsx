import { useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import size from "lodash/size";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Stack, AttachmentTag } from "@deskpro/deskpro-ui";
import { Title, Property, TwoProperties } from "@deskpro/app-sdk";
import { useExternalLink } from "../../../hooks";
import { format } from "../../../utils/date";
import { getFullName } from "../../../utils";
import {
  Tag,
  Status,
  Member,
  Markdown,
  TextWithLink,
  DeskproTickets,
  MeisterTaskLogo,
} from "../../common";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Attachment, Project, Task, Label, Person } from "../../../services/meister-task/types";

type Props = {
  task: Task,
  labels: Label[],
  projects: Project[],
  persons: Person[],
  attachments: Attachment[],
};

const Details: FC<Props> = ({ task, labels, projects, persons, attachments }) => {
  const { getTaskUrl, getProjectUrl } = useExternalLink();
  const project = useMemo(() => {
    return find(projects, { id: get(task, ["project_id"]) });
  }, [projects, task]);
  const assignee = useMemo(() => {
    return find(persons, { id: get(task, ["assigned_to_id"]) });
  }, [persons, task]) as Person;

  return (
    <>
      <Title
        title={get(task, ["name"])}
        icon={<MeisterTaskLogo/>}
        link={getTaskUrl(task)}
      />
      <Property
        label="Description"
        text={(<Markdown text={get(task, ["notes"], "-") || "-"} />)}
      />
      <Property
        label="Project"
        text={(
          <TextWithLink
            text={get(project, ["name"], "-")}
            link={getProjectUrl(project)}
          />
        )}
      />
      <Property
        label="Section"
        text={get(task, ["section_name"], "-")}
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
        rightLabel="Due date"
        rightText={format(get(task, ["due"]))}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets entityId={get(task, ["id"], "")} />}
      />
      <Property
        label="Tags"
        text={!size(labels) ? "-" : (
          <Stack gap={6} wrap="wrap">
            {labels.map((label) => (<Tag key={get(label, ["name"])} tag={label} />))}
          </Stack>
        )}
      />
      <Property
        label="Assignee"
        text={!assignee ? "-" : (
          <Member
            key={get(assignee, ["id"])}
            name={getFullName(assignee)}
            avatarUrl={get(assignee, ["avatar_thumb"])}
          />
        )}
      />
      <Property
        label="Attachments"
        text={!size(attachments) ? "-" : (
          <Stack gap={6} wrap="wrap">
            {attachments.map((attach) => (
              <AttachmentTag
                key={attach.id}
                filename={attach.name}
                fileSize={attach.size}
                icon={faFile as AnyIcon}
                href={attach.url}
              />
            ))}
          </Stack>
        )}
      />
    </>
  );
};

export { Details };
