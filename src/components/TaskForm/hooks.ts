import { useMemo } from "react";
import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getProjectsService,
  getProjectLabelsService,
  getProjectPersonsService,
  getProjectSectionsService,
} from "../../services/meister-task";
import {
  getOptions,
  getLabelOptions,
  getPersonOptions,
  getStatusOptions,
} from "./utils";
import { QueryKey } from "../../query";
import type { Option } from "../../types";
import type { Project, Section, Person, Label, TaskStatus } from "../../services/meister-task/types";

type UseFormDeps = (projectId?: Project["id"]) => {
  isLoading: boolean,
  projectOptions: Array<Option<Project["id"]>>,
  sectionOptions: Array<Option<Section["id"]>>,
  assigneeOptions: Array<Option<Person["id"]>>,
  statusOptions: Array<Option<TaskStatus>>,
  labelOptions: Array<Option<Label["id"]>>,
};

const useFormDeps: UseFormDeps = (projectId) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const sections = useQueryWithClient(
    [QueryKey.SECTIONS_BY_PROJECT, `${projectId}` as string],
    (client) => getProjectSectionsService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const persons = useQueryWithClient(
    [QueryKey.PERSONS_BY_PROJECT, `${projectId}` as string],
    (client) => getProjectPersonsService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const labels = useQueryWithClient(
    [QueryKey.LABELS_BY_PROJECT, `${projectId}` as string],
    (client) => getProjectLabelsService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  return {
    isLoading: [projects].some(({ isFetching }) => isFetching),
    projectOptions: useMemo(() => getOptions<Project>(get(projects, ["data"])), [projects]),
    sectionOptions: useMemo(() => getOptions<Section>(get(sections, ["data"])), [sections]),
    statusOptions: useMemo(() => getStatusOptions(), []) as Array<Option<TaskStatus>>,
    assigneeOptions: useMemo(() => getPersonOptions(get(persons, ["data"])), [persons]),
    labelOptions: useMemo(() => getLabelOptions(get(labels, ["data"])), [labels]),
  }
};

export { useFormDeps };
