import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { Maybe } from "../../types";
import type { Comment } from "../../services/meister-task/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type CommentValues = {
  text: Comment["text"],
};

export type Props = {
  onSubmit: SubmitHandler<FormValidationSchema>,
  onCancel?: () => void,
  error?: Maybe<string|string[]>,
};
