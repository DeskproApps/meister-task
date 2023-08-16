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

export type Project = {
  id: number,
  token: string,
  name: string,
  notes: string,
  status: number, // 1
  share_mode: number,
  share_token: null,
  share_token_enabled: boolean,
  created_at: DateTime,
  updated_at: DateTime,
};

export enum TaskStatus {
  OPEN = 1,
  COMPLETED = 2,
  ARCHIVED = 18,
  TRASHED = 8,
}

export type Task =  {
  id: number,
  token: string,
  name: string,
  notes: string,
  notes_html: string,
  status: TaskStatus[keyof TaskStatus],
  status_updated_at: DateTime,
  section_id: number,
  section_name: string,
  project_id: Project["id"],
  sequence: number,
  assigned_to_id: null,
  assignee_name: string,
  tracked_time: number,
  due: DateTime,
  created_at: DateTime,
  updated_at: DateTime,
};
