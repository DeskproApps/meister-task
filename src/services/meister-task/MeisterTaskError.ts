import type { MeisterTaskAPIError } from "./types";

export type InitData = {
  status: number,
  data: MeisterTaskAPIError,
};

class MeisterTaskError extends Error {
  status: number;
  data: MeisterTaskAPIError;

  constructor({ status, data }: InitData) {
    const message = "Bitbucket Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { MeisterTaskError };
