import { Container } from "../common";
import { TaskForm } from "../TaskForm";
import type { FC } from "react";
import type { Props as FormProps } from "../TaskForm";

type Props = Omit<FormProps, "onCancel"|"task"|"labelIds"> & {
  task: FormProps["task"],
  labelIds: FormProps["labelIds"],
  onCancel: FormProps["onCancel"],
};

const EditTask: FC<Props> = (props) => {
  return (
    <Container>
      <TaskForm {...props} isEditMode />
    </Container>
  );
};

export { EditTask };
