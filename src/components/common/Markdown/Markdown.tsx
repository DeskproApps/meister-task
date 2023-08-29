import showdown from "showdown";
import styled from "styled-components";
import { TSpan } from "@deskpro/deskpro-ui";
import { dpNormalize } from "../../../styles";
import type { FC } from "react";

type Props = {
  text: string,
};

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
});

const MarkdownStyled = styled(TSpan)`
  width: 100%;
  ${dpNormalize}
`;

const Markdown: FC<Props> = ({ text }) => (
  <MarkdownStyled
    type="p5"
    dangerouslySetInnerHTML={{__html: converter.makeHtml(text)}}
  />
);

export { Markdown };
