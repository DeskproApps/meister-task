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

// 1xx
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

// 4xx
export type Attachment = {
  id: number,
  name: string,
  size: number,
  source: number, // 1: google, 2: dropbox, 3: meistertask, 4: mindmeister, 6: link
  content_type: string,
  person_id: Person["id"],
  task_id: Task["id"],
  created_at: DateTime,
  updated_at: DateTime,
  url: string,
  thumb_url: string,
  medium_url: string,
  large_url: string,
  embed_url: string,
  embed_thumb_url: string,
  embed_medium_url: string,
  embed_large_url: string,
};

// 7xx
export type Checklist = {
  id: number,
  name: string,
  sequence: number,
  task_id: Task["id"],
  project_id: Project["id"],
};

export enum ChecklistItemStatus {
  ACTIONABLE = 1,
  COMPLETED = 5
}

// 8xx
export type ChecklistItem = {
  id: number,
  checklist_id: Checklist["id"],
  sequence: number,
  name: string,
  text_html: string,
  text_email: string,
  status: number, // 1: actionable, 5: completed
  created_at: string,
  updated_at: string,
};

// 5xx
export type Comment = {
  id: number,
  text: string,
  text_html: string,
  text_email: string,
  person_id: Person["id"],
  task_id: Task["id"],
  created_at: DateTime,
  updated_at: DateTime,
};

export type Label = {
  id: number,
  project_id: Project["id"],
  name: string,
  color: string,
};

export enum TaskStatus {
  OPEN = 1,
  COMPLETED = 2,
  ARCHIVED = 18,
  TRASHED = 8,
}

// 3xx
export type Task =  {
  id: number,
  token: string,
  name: string,
  notes: string,
  notes_html: string,
  status: TaskStatus[keyof TaskStatus],
  status_updated_at: DateTime,
  section_id: number, // 2xx
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
