import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Task } from "../../../services/meister-task/types";

type Props = {
  selectedTasks: Task[],
  isSubmitting: boolean,
  onLinkTasks: () => void,
  onCancel: () => void,
};

const Buttons: FC<Props> = ({ isSubmitting, selectedTasks, onLinkTasks, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Tasks"
      disabled={!size(selectedTasks) || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkTasks}
    />
    <Button
      type="button"
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
