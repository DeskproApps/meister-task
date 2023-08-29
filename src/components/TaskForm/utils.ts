import { createElement } from "react";
import get from "lodash/get";
import trim from "lodash/trim";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import difference from "lodash/difference";
import formatISO from "date-fns/formatISO";
import { z } from "zod";
import { getOption, getFullName } from "../../utils";
import { taskStatus } from "../../services/meister-task";
import { Member, Tag } from "../common";
import type { Option } from "../../types";
import type { Task, Person, Label, TaskStatus, Section, TaskLabelRelation } from "../../services/meister-task/types";
import type { FormValidationSchema, TaskValues } from "./types";

const validationSchema = z.object({
  project: z.number().positive(),
  section: z.number().positive(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  status: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(8),
    z.literal(18),
  ]),
  assignee: z.number().nullish(),
  dueDate: z.date().optional(),
  labels: z.array(z.number()).optional(),
});

const getInitValues = (
  task?: Task,
  labelIds?: Array<Label["id"]>,
): FormValidationSchema => {
  const dueDate = get(task, ["due"], null);

  return {
    project: get(task, ["project_id"], 0),
    section: get(task, ["section_id"], 0),
    name: get(task, ["name"], ""),
    description: get(task, ["notes"], ""),
    assignee: get(task, ["assigned_to_id"], 0),
    dueDate: !dueDate ? undefined : new Date(dueDate),
    status: get(task, ["status"], taskStatus.OPEN),
    labels: isEmpty(labelIds) ? [] : labelIds,
  };
};

const getTaskValues = (values: FormValidationSchema): TaskValues => {
  const notes = trim(get(values, ["description"], ""));
  const assigneeId = get(values, ["assignee"]);
  const status = get(values, ["status"]);
  const labelIds = get(values, ["labels"], []) || [];
  const dueDate = get(values, ["dueDate"], null);

  return {
    name: get(values, ["name"]),
    notes: !notes ? "" : notes,
    label_ids: isEmpty(labelIds) ? [] : labelIds,
    ...(!assigneeId ? {} : { assigned_to_id: assigneeId }),
    ...(!dueDate ? {} : { due: formatISO(dueDate) }),
    ...(!status ? {} : { status }),
  };
};

const getSectionId = (values: FormValidationSchema): Section["id"] => {
  return get(values, ["section"]);
};

const getOptions = <T>(items?: T[]) => {
  if (!Array.isArray(items) || !size(items)) {
    return [];
  }

  return items.map((item) => getOption(get(item, ["id"]), get(item, ["name"])));
};

const getStatusOptions = (): Array<Option<TaskStatus>> => {
  return [
    getOption<TaskStatus>(taskStatus.OPEN, "Open"),
    getOption<TaskStatus>(taskStatus.COMPLETED, "Completed"),
    getOption<TaskStatus>(taskStatus.ARCHIVED, "Archived"),
    getOption<TaskStatus>(taskStatus.TRASHED, "Trashed"),
  ];
};

const getPersonOptions = (persons?: Person[]) => {
  if (!Array.isArray(persons) || !size(persons)) {
    return [];
  }

  return persons.map((person) => {
    const fullName = getFullName(person);
    const label = createElement(Member, {
      key: get(person, ["id"]),
      name: fullName,
      avatarUrl: get(person, ["avatar_thumb"])
    });
    return getOption(person.id, label, fullName);
  });
};

const getLabelOptions = (labels?: Label[]): Array<Option<Label["id"]>> => {
  if (!Array.isArray(labels) || !size(labels)) {
    return [];
  }

  return labels.map((label) => {
    return getOption(label.id, createElement(Tag, { key: label.id, tag: label }), label.name);
  });
};

const getLabelsToUpdate = (
  taskLabelRelations: TaskLabelRelation[],
  values: FormValidationSchema,
): {
  add: Array<Label["id"]>,
  rem: Array<TaskLabelRelation["id"]>,
} => {
  const updatedLabels: Array<Label["id"]> = get(values, ["labels"], []) || [];

  if (!size(updatedLabels)) {
    return { add: [], rem: [] };
  }

  const add = difference(updatedLabels, taskLabelRelations.map(({ label_id }) => label_id));
  const remove = taskLabelRelations.map(({ id, label_id }) => {
      if (!updatedLabels.includes(label_id)) {
        return id;
      }
    }).filter(Boolean) as Array<TaskLabelRelation["id"]>;

  return {
    add: add,
    rem: remove,
  };
};

export {
  getOptions,
  getSectionId,
  getInitValues,
  getTaskValues,
  getLabelOptions,
  getPersonOptions,
  getStatusOptions,
  validationSchema,
  getLabelsToUpdate,
};
