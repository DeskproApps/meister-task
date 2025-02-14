import { Login } from "../../components";
import { useDeskproElements } from "@deskpro/app-sdk";
import { useLogin } from "./hooks";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { onSignIn, authUrl, isLoading } = useLogin();

  useSetTitle("MeisterTask");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <Login onLogin={onSignIn} authUrl={authUrl} isLoading={isLoading} />
  );
};

export { LoginPage };
