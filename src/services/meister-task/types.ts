export type MeisterTaskAPIError = {
  errors: Array<{
    message: string,
    status: number
  }>
};
