import { createElement } from "react";
import get from "lodash/get";
import trim from "lodash/trim";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import formatISO from "date-fns/formatISO";
import { z } from "zod";
import { getOption, getFullName } from "../../utils";
import { taskStatus } from "../../services/meister-task";
import { Member, Tag } from "../common";
import type { Option } from "../../types";
import type { Person, Label, TaskStatus, Section } from "../../services/meister-task/types";
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
  assignee: z.number().optional(),
  dueDate: z.date().optional(),
  labels: z.array(z.number()).optional(),
});

const getInitValues = (): FormValidationSchema => {
  return {
    project: 0,
    section: 0,
    name: "",
    description: "",
    assignee: 0,
    dueDate: undefined,
    status: taskStatus.OPEN,
    labels: [],
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
    ...(!notes ? {} : { notes }),
    ...(!assigneeId ? {} : { assigned_to_id: assigneeId }),
    ...(!dueDate ? {} : { due: formatISO(dueDate) }),
    ...(!status ? {} : { status }),
    ...(isEmpty(labelIds) ? {} : { label_ids: labelIds }),
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

export {
  getOptions,
  getSectionId,
  getInitValues,
  getTaskValues,
  getLabelOptions,
  getPersonOptions,
  getStatusOptions,
  validationSchema,
};
