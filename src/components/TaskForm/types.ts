import { z } from "zod";
import { validationSchema } from "./utils";
import type { Maybe } from "../../types";
import type { Task } from "../../services/meister-task/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type TaskValues = {
  //..
};

export type Props = {
  onSubmit: (values: FormValidationSchema) => Promise<void>,
  onCancel?: () => void,
  task?: Task,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>,
};
