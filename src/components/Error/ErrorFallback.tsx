import get from "lodash/get";
import { Stack } from "@deskpro/deskpro-ui";
import { MeisterTaskError } from "../../services/meister-task";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

const ErrorFallback: FC<Props> = ({error}) => {
  let message = "There was an error!";
  const button = null;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof MeisterTaskError) {
    message = get(error, ["data", "error", "message"], message);
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
