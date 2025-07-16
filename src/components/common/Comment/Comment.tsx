import React from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Avatar, TSpan, P11, Stack } from "@deskpro/deskpro-ui";
import { dpNormalize } from "../../../styles";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Maybe } from "../../../types";
import { DeskproAppTheme } from "@deskpro/app-sdk";

const TimeAgo = styled(ReactTimeAgo) <DeskproAppTheme>`
  color: ${({ theme }) => theme.colors.grey80};
`;

const Author = styled(Stack)`
  width: 35px;
`;

const Body = styled(TSpan)`
  width: calc(100% - 35px);
  white-space: pre-line;

  ${dpNormalize}
`;

type Props = {
  name: string,
  text: string,
  date?: Maybe<Date>,
  avatarUrl?: string,
};

const Comment: FC<Props> = ({ name, avatarUrl, text, date }) => {
  return (
    <Stack wrap="nowrap" gap={6} style={{ marginBottom: 10 }}>
      <Author vertical>
        <Avatar
          size={18}
          name={name}
          backupIcon={faUser as AnyIcon}
          imageUrl={avatarUrl}
        />
        {date && (
          <P11>
            <TimeAgo date={date} timeStyle="mini" />
          </P11>
        )}
      </Author>
      <Body type="p5">
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </Body>
    </Stack>
  );
};

export { Comment };
