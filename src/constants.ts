/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

/** Deskpro */
export const APP_PREFIX = "meister-task";

export const ENTITY = "linkedMeisterTask";

export const DEFAULT_ERROR = "There was an error!";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";
export const REFRESH_TOKEN_PATH = "oauth2/refresh_token";

export const placeholders = {
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  CLIENT_ID: "__client_id__",
  CLIENT_SECRET: "__client_secret__",
} as const;

/** MeisterTask */
export const BASE_URL = "https://www.meistertask.com/api";
export const AUTH_URL = "https://www.mindmeister.com/oauth2";
export const HTML_URL = "https://www.meistertask.com/app";

export const SCOPES = ["userinfo.email", "userinfo.profile", "meistertask"] as const;

export const DESKPRO_LABEL = {
  name: "Deskpro",
  color: "00aaff",
} as const;
