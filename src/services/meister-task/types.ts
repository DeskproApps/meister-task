import type { Maybe, DateTime } from "../../types";

export type MeisterTaskAPIError = {
  errors: Array<{
    message: string,
    status: number
  }>
};

export type AccessToken = {
  token_type: "Bearer"
  access_token: string,
  created_at: number,
  scope: string,
};

export type Person = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  avatar: Maybe<string>,
  avatar_thumb: Maybe<string>,
  created_at: DateTime,
  updated_at: DateTime,
};
