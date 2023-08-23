import { Fragment } from "react";
import size from "lodash/size";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../common";
import { TaskItem } from "../TaskItem";
import type { FC } from "react";
import type { Task, Project } from "../../services/meister-task/types";

type Props = {
  tasks: Task[],
  projects: Project[],
  onNavigateToTask: (taskId: Task["id"]) => void,
}

const Home: FC<Props> = ({ tasks, projects, onNavigateToTask }) => {
  return (
    <Container>
      {!Array.isArray(tasks)
        ? <NoFound/>
        : !size(tasks)
        ? <NoFound text="No MeisterTask tasks found"/>
        : tasks.map((task) => (
          <Fragment key={task.id}>
            <TaskItem
              task={task}
              projects={projects}
              onClickTitle={() => onNavigateToTask(task.id)}
            />
            <HorizontalDivider style={{ margin: "10px 0" }}/>
          </Fragment>
        ))
      }
    </Container>
  );
};

export { Home };
