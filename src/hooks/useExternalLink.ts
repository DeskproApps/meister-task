import { useCallback } from "react";
import get from "lodash/get";
import { HTML_URL } from "../constants";
import { Task, Project } from "../services/meister-task/types";

export type Result = {
  getTaskUrl: (task?: Task) => undefined|string,
  getProjectUrl: (project?: Project) => undefined|string,
};

const useExternalLink = (): Result => {
  const getTaskUrl = useCallback((task?: Task): undefined|string => {
    const taskToken = get(task, "token");

    if (taskToken) {
      return `${HTML_URL}/task/${taskToken}`;
    }
  }, []);

  const getProjectUrl = useCallback((project?: Project): undefined|string => {
    const projectToken = get(project, "token");

    if (projectToken) {
      return `${HTML_URL}/project/${projectToken}`;
    }
  }, []);

  return { getTaskUrl, getProjectUrl };
};

export { useExternalLink };
