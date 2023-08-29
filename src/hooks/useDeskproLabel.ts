import { useCallback, useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import noop from "lodash/noop";
import isEmpty from "lodash/isEmpty";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import {
  getTaskLabelsService,
  addLabelToTaskService,
  getProjectLabelsService,
  createProjectLabelService,
  removeLabelFromTaskService,
  getTaskLabelRelationsService,
} from "../services/meister-task";
import { findDeskproLabel } from "../utils";
import { DESKPRO_LABEL } from "../constants";
import type { TicketContext } from "../types";
import type { Task, TaskLabelRelation, Label } from "../services/meister-task/types";

export type Result = {
  addDeskproLabel: (task: Task) => Promise<void|TaskLabelRelation>,
  removeDeskproLabel: (task: Task) => Promise<void>,
};

const useDeskproLabel = (): Result => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const isEnableDeskproLabel = useMemo(() => {
    return get(context, ["settings", "add_deskpro_label"]) === true
  }, [context]);

  const addDeskproLabel = useCallback((task: Task) => {
    if (!client || !isEnableDeskproLabel || isEmpty(task)) {
      return Promise.resolve();
    }

    return getProjectLabelsService(client, task.project_id)
      .then((labels) => {
        const deskproLabel = findDeskproLabel(labels);

        return deskproLabel
          ? Promise.resolve<Label>(deskproLabel)
          : createProjectLabelService(client, task.project_id, DESKPRO_LABEL);
      })
      .then((label) => addLabelToTaskService(client, task.id, label.id))
      .catch(noop);
  }, [client, isEnableDeskproLabel]);

  const removeDeskproLabel = useCallback((task: Task) => {
    if (!client || !isEnableDeskproLabel) {
      return Promise.resolve();
    }

    return Promise.all([
      getTaskLabelsService(client, task.id),
      getTaskLabelRelationsService(client, task.id),
    ])
      .then(([labels, labelRelations]) => {
        const deskproLabel = findDeskproLabel(labels);
        const relation = find(labelRelations, { label_id: get(deskproLabel, ["id"]) });

        return (!relation?.id)
          ? Promise.resolve()
          : removeLabelFromTaskService(client, relation.id);
      })
      .catch(noop)
  }, [client, isEnableDeskproLabel]);

  return { addDeskproLabel, removeDeskproLabel };
};

export { useDeskproLabel };
