import { Container, Navigation } from "../common";
import { TaskForm } from "../TaskForm";
import type { FC } from "react";
import type { Props as FormProps } from "../TaskForm";

type Props = FormProps & {
  onNavigateToLink: () => void,
};

const CreateTask: FC<Props> = ({ onNavigateToLink, ...props }) => {
  return (
    <Container>
      <Navigation selected="two" onOneNavigate={onNavigateToLink} />
      <TaskForm {...props} />
    </Container>
  );
};

export { CreateTask };
