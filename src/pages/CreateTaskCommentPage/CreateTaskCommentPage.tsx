import { useState, useCallback } from "react";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError } from "../../hooks";
import { getError } from "../../utils";
import { createTaskCommentService, createTaskAttachmentService } from "../../services/meister-task";
import { CreateTaskComment } from "../../components";
import {
  getValues,
  getAttachments,
  getAttachFormData,
} from "../../components/TaskCommentForm";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/TaskCommentForm";

const CreateTaskCommentPage: FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    navigate(`/task/view/${taskId}`);
  }, [navigate, taskId]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !taskId) {
      return Promise.resolve();
    }

    const values = getValues(data);
    const attachments = getAttachments(data);

    setError(null);

    return Promise.all([
      (isEmpty(values.text)
        ? Promise.resolve()
        : createTaskCommentService(client, Number(taskId), values)
      ),
      ...(!size(attachments) ? [Promise.resolve()] : attachments.map((attach) => {
        return createTaskAttachmentService(client, Number(taskId), getAttachFormData(attach))
      }))
    ])
      .then(() => navigate(`/task/view/${taskId}`))
      .catch((err) => {
        const errors = getError(err?.data);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, taskId, navigate, asyncErrorHandler]);

  useSetTitle("Comment");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateTaskComment
      error={error}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export { CreateTaskCommentPage };
