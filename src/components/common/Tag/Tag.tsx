import get from "lodash/get";
import { Tag as TagUI } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { Label } from "../../../services/meister-task/types";

type Props = {
  tag: Label,
};

const Tag: FC<Props> = ({ tag }) => {
  const name = get(tag, ["name"]);
  const color = get(tag, ["color"]);

  if (!name || !color) {
    return (<>-</>);
  }

  return (
    <TagUI label={name} color={{
      backgroundColor: `#${color}33`, // 20% opacity
      borderColor: `#${color}`,
      textColor: `#${color}`,
    }} />
  );
};

export { Tag };
