import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import { getInitValues, validationSchema } from "./utils";
import {
  Label,
  Button,
  Select,
  TextArea,
  DateInput,
  ErrorBlock,
} from "../common";
import type { FC } from "react";
import type { FormValidationSchema, Props } from "./types";
import type { Project, Section, Person, TaskStatus } from "../../services/meister-task/types";

const TaskForm: FC<Props> = ({
  task,
  error,
  labelIds,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(task, labelIds),
    resolver: zodResolver(validationSchema),
  });
  const {
    isLoading,
    labelOptions,
    statusOptions,
    projectOptions,
    sectionOptions,
    assigneeOptions,
  } = useFormDeps(watch("project"));

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="project" label="Project" required>
        <Select<Project["id"]>
          id="project"
          disabled={isEditMode}
          value={watch("project")}
          options={projectOptions}
          onChange={({ value }) => {
            setValue("project", value);
            setValue("section", 0);
            setValue("assignee", 0);
          }}
          error={has(errors, ["project", "message"])}
        />
      </Label>

      <Label htmlFor="section" label="Section" required>
        <Select<Section["id"]>
          id="section"
          value={watch("section")}
          options={sectionOptions}
          onChange={({ value }) => setValue("section", value)}
          error={has(errors, ["section", "message"])}
        />
      </Label>

      <Label htmlFor="name" label="Task name" required>
        <Input
          id="name"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["name", "message"])}
          value={watch("name")}
          {...register("name")}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          variant="inline"
          id="description"
          minHeight="auto"
          placeholder="Enter value"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
      </Label>

      <Label htmlFor="status" label="Status">
        <Select<TaskStatus>
          id="status"
          value={watch("status")}
          options={statusOptions}
          error={has(errors, ["status", "message"])}
          onChange={({ value }) => setValue("status", value)}
        />
      </Label>

      <Label htmlFor="assignee" label="Assignee">
        <Select<Person["id"]>
          id="assignee"
          value={watch("assignee")}
          showInternalSearch
          options={assigneeOptions}
          error={has(errors, ["assignee", "message"])}
          onChange={({ value }) => setValue("assignee", value)}
        />
      </Label>

      <Label htmlFor="dueDate" label="Due date">
        <DateInput
          id="dueDate"
          enableTime
          placeholder="DD/MM/YYYY"
          value={watch("dueDate") as Date}
          error={has(errors, ["dueDate", "message"])}
          onChange={(date) => setValue("dueDate", date[0])}
        />
      </Label>

      <Label htmlFor="labels" label="Labels">
        <Select
          id="labels"
          value={watch("labels")}
          showInternalSearch
          options={labelOptions}
          error={has(errors, ["labels", "message"])}
          closeOnSelect={false}
          onChange={(o) => {
            const labels = watch("labels");

            if (o.value) {
              const selectedLabels = Array.isArray(labels) ? labels : [];
              const newValue = selectedLabels.includes(o.value)
                ? selectedLabels.filter((label) => label !== o.value)
                : [...selectedLabels, o.value];

              setValue("labels", newValue);
            }
          }}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && (
          <Button type="button" text="Cancel" intent="tertiary" onClick={onCancel}/>
        )}
      </Stack>
    </form>
  );
};

export { TaskForm };
