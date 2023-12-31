import { z } from "zod";
import { validationSchema } from "./utils";
import type { Maybe, DateTime } from "../../types";
import type { Task, Label, Person, Project } from "../../services/meister-task/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type TaskValues = {
  name: Task["name"],
  notes: Task["notes"],
  label_ids: Array<Label["id"]>,
  assigned_to_id?: Person["id"],
  due?: DateTime,
  status?: Task["status"],
};

export type Props = {
  onSubmit: (
    values: FormValidationSchema,
    project?: { id?: Project["id"], name?: Project["name"] },
    assignee?: { id?: Person["id"], fullName?: string },
    labels?: Array<{ id?: Label["id"], name?: Label["name"] }>,
  ) => Promise<void>,
  onCancel?: () => void,
  task?: Task,
  labelIds?: Array<Label["id"]>,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>,
};
