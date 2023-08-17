import { Fragment, useCallback } from "react";
import get from "lodash/get";
import find from "lodash/find";
import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { getFullName } from "../../../utils";
import { Comment, Markdown } from "../../common";
import type { FC } from "react";
import type { Person, Comment as CommentType } from "../../../services/meister-task/types";

type Props = {
  persons: Person[],
  comments: CommentType[],
};

const Comments: FC<Props> = ({ comments, persons }) => {
  const findPerson = useCallback((personId: Person["id"]) => {
    return find(persons, { id: personId });
  }, [persons]);

  return (
    <>
      <Title title={`Comments (${size(comments)})`} />

      {comments.map(({ id, text, created_at, person_id }) => {
        const person = findPerson(person_id);

        return (
          <Fragment key={id}>
            <Comment
              name={getFullName(person)}
              avatarUrl={get(person, ["avatar_thumb"]) as string}
              date={new Date(created_at)}
              text={<Markdown text={text} />}
            />
            <HorizontalDivider style={{ marginBottom: 10 }} />
          </Fragment>
        )
      })}
    </>
  );
};

export { Comments };
