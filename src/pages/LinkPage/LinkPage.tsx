import { H1 } from "@deskpro/deskpro-ui";
import { useDeskproElements } from "@deskpro/app-sdk";
import type { FC } from "react";

const LinkPage: FC = () => {
  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <H1>Link Page</H1>
  );
};

export { LinkPage };
