import { get } from "lodash";
import { Maybe } from "../types";
import type { MeisterTaskAPIError } from "../services/meister-task/types";

const getError = (error?: Maybe<MeisterTaskAPIError>): Maybe<string> => {
  return get(error, ["errors", 0, "message"])
    || get(error, ["error", "message"])
    || null;
};

export { getError };
