import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Person } from "./types";

const getCurrentPersonService = (client: IDeskproClient) => {
  return baseRequest<Person>(client, {
    url: "/persons/me",
  });
};

export { getCurrentPersonService };
