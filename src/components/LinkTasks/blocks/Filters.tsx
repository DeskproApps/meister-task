import { useMemo } from "react";
import { getOption } from "../../../utils";
import { Label, Select } from "../../common";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../../types";
import type { Project } from "../../../services/meister-task/types";

type Props = {
  projects: Project[],
  selectedProject: Maybe<Project["id"]>,
  onChangeProject: Dispatch<Project["id"]>,
};

const Filters: FC<Props> = ({ projects, selectedProject, onChangeProject }) => {
  const workspaceOptions = useMemo(() => {
    return (!Array.isArray(projects) ? [] : projects)
      .map(({ id, name }) => getOption(id, name));
  }, [projects]);

  return (
    <Label label="Project">
      <Select<Project["id"]>
        id="project"
        showInternalSearch
        value={selectedProject}
        options={workspaceOptions}
        onChange={(o) => onChangeProject(o.value)}
        noFoundText="No project(s) found"
      />
    </Label>
  );
};

export { Filters };
