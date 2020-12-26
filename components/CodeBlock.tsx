import React from "react";
import { Prism } from "react-syntax-highlighter";
const CodeBlock = ({ block }) => {
  return <Prism language="javascript">{block.getText()}</Prism>;
};

export default CodeBlock;
