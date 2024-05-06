import { taskStatus, sectionStatus, checklistItemStatus } from "./constants";
import type { Maybe, DateTime } from "../../types";

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

export type SectionStatus = typeof sectionStatus[keyof typeof sectionStatus];

export type ChecklistItemStatus = typeof checklistItemStatus[keyof typeof checklistItemStatus]

export type ErrorItem = {
  message: string,
  status: number
};

export type APIError = {
  errors: ErrorItem|Array<ErrorItem>;
};

export type AuthError = {
  error: {
    type: string,
    message: string,
    details: string,
  }
};

export type MeisterTaskAPIError = APIError|AuthError;

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

// 8xx
export type ChecklistItem = {
  id: number,
  checklist_id: Checklist["id"],
  sequence: number,
  name: string,
  text_html: string,
  text_email: string,
  status: ChecklistItemStatus,
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

export type Section = {
  id: number,
  name: string,
  description: string,
  color: string, // "2ed7d8",
  indicator: number, // the icon of the section.
  status: SectionStatus,
  project_id: Project["id"],
  sequence: number,
  limit: null,
  created_at: DateTime,
  updated_at: DateTime,
};

// 3xx
export type Task =  {
  id: number,
  token: string,
  name: string,
  notes: string,
  notes_html: string,
  status: TaskStatus,
  status_updated_at: DateTime,
  section_id: Section["id"], // 2xx
  section_name: Section["name"],
  project_id: Project["id"],
  sequence: number,
  assigned_to_id: Maybe<Person["id"]>,
  assignee_name: string,
  tracked_time: number,
  due: DateTime,
  created_at: DateTime,
  updated_at: DateTime,
};

export type TaskLabelRelation = {
  id: number,
  label_id: Label["id"],
  task_id: Task["id"],
};
