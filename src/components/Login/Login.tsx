import { H3 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Container, AnchorButton } from "../common";
import type { FC } from "react";

type Props = {
  authUrl: string|null,
  onLogin: () => void,
  isLoading: boolean,
};

const Login: FC<Props> = ({ authUrl, onLogin, isLoading }) => (
  <Container>
    <Title as={H3} title="Log into your MeisterTask Account" />
    <AnchorButton
      intent="secondary"
      text="Log In"
      target="_blank"
      href={authUrl || "#"}
      onClick={onLogin}
      loading={isLoading}
      disabled={!authUrl || isLoading}
    />
  </Container>
);

export { Login };
