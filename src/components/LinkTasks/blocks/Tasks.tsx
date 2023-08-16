import { Fragment } from "react";
import size from "lodash/size";
import { Checkbox } from "@deskpro/deskpro-ui";
import { LoadingSpinner, HorizontalDivider } from "@deskpro/app-sdk";
import { TaskItem } from "../../TaskItem";
import { NoFound, Card } from "../../common";
import type { FC } from "react";
import type { Task, Project } from "../../../services/meister-task/types";

type Props = {
  tasks: Task[],
  isLoading: boolean,
  projects: Project[],
  selectedTasks: Task[],
  onChangeSelectedTask: (task: Task) => void,
};

const Tasks: FC<Props> = ({
  tasks,
  projects,
  isLoading,
  selectedTasks,
  onChangeSelectedTask,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      {!Array.isArray(tasks)
        ? <NoFound/>
        : !size(tasks)
        ? <NoFound text="No MeisterTask tasks found"/>
        : tasks.map((task) => (
          <Fragment key={task.id}>
            <Card>
              <Card.Media>
                <Checkbox
                  size={12}
                  containerStyle={{ marginTop: 4 }}
                  onChange={() => onChangeSelectedTask(task)}
                  checked={selectedTasks.some((selectedTask) => {
                    return task.id === selectedTask.id;
                  })}
                />
              </Card.Media>
              <Card.Body>
                <TaskItem
                  task={task}
                  projects={projects}
                  onClickTitle={() => onChangeSelectedTask(task)}
                />
              </Card.Body>
            </Card>
            <HorizontalDivider style={{ marginBottom: 6 }} />
          </Fragment>
        ))
      }
    </>
  );
};

export { Tasks };
