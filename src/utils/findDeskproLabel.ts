import find from "lodash/find";
import size from "lodash/size";
import toLower from "lodash/toLower";
import { DESKPRO_LABEL } from "../constants";
import type { Label } from "../services/meister-task/types";

const findDeskproLabel = (labels: Label[]): Label|void => {
  if (!Array.isArray(labels) || !size(labels)) {
    return;
  }

  return find(labels, ({ name }) => toLower(name) === toLower(DESKPRO_LABEL.name));
};

export { findDeskproLabel };
