import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { nbsp } from "../constants";
import type { Maybe } from "../types";
import type { Person } from "../services/meister-task/types";

const getFullName = (person?: Maybe<Person>): string => {
  if (!person) {
    return "-";
  }

  const firstName = get(person, ["firstname"]);
  const lastName = get(person, ["lastname"]);
  const fullName = [];

  if (firstName) {
    fullName.push(firstName);
  }

  if (lastName) {
    fullName.push(lastName)
  }

  return !isEmpty(fullName)
    ? fullName.join(nbsp)
    : get(person, "email") || "-";
};

export { getFullName };
