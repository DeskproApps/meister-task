import get from "lodash/get";
import toLower from "lodash/toLower";
import size from "lodash/size";
import type { Task } from "../services/meister-task/types";

const filterTasks = (tasks: Task[], q?: string) => {
  const searchQuery = toLower(q);

  if (!Array.isArray(tasks) || !size(tasks)) {
    return [];
  }

  if (!q) {
    return tasks;
  }

  return tasks.filter((task) => {
    const taskName = toLower(get(task, ["name"], ""));
    const taskId = toLower(get(task, ["id"], "") as string);
    const taskToken = toLower(get(task, ["token"], ""));

    return (searchQuery === taskId)
      || (searchQuery === taskToken)
      || (taskName.includes(searchQuery));
  });
};

export { filterTasks };
