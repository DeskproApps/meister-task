import get from "lodash/get";
import { Stack } from "@deskpro/deskpro-ui";
import { getError } from "../../utils";
import { MeisterTaskError } from "../../services/meister-task";
import { DEFAULT_ERROR } from "../../constants";
import { Container, ErrorBlock } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({error}) => {
  let message = DEFAULT_ERROR;
  const button = null;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof MeisterTaskError) {
    message = getError(get(error, ["data"])) || DEFAULT_ERROR;
  }

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{padding: "8px"}}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
