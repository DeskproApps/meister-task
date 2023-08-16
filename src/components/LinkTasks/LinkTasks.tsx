import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, Search } from "../common";
import { Filters, Buttons, Tasks } from "./blocks";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../types";
import type { Task, Project } from "../../services/meister-task/types";

type Props = {
  isLoading: boolean,
  onChangeSearch?: (search: string) => void,
  tasks: Task[],
  projects: Project[],
  selectedTasks: Task[],
  onChangeSelectedTask: (task: Task) => void,
  isSubmitting: boolean,
  onLinkTasks: () => void,
  onCancel: () => void,
  selectedProject: Maybe<Project["id"]>,
  onChangeProject: Dispatch<Project["id"]>,
};

const LinkTasks: FC<Props> = ({
  tasks,
  onCancel,
  projects,
  isLoading,
  onLinkTasks,
  isSubmitting,
  selectedTasks,
  onChangeSearch,
  selectedProject,
  onChangeProject,
  onChangeSelectedTask,
}) => {
  return (
    <>
      <Container>
        <Search onChange={onChangeSearch}/>
        <Filters
          projects={projects}
          selectedProject={selectedProject}
          onChangeProject={onChangeProject}
        />
        <Buttons
          onCancel={onCancel}
          onLinkTasks={onLinkTasks}
          isSubmitting={isSubmitting}
          selectedTasks={selectedTasks}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Tasks
          tasks={tasks}
          projects={projects}
          isLoading={isLoading}
          selectedTasks={selectedTasks}
          onChangeSelectedTask={onChangeSelectedTask}
        />
      </Container>
    </>
  );
};

export { LinkTasks };
