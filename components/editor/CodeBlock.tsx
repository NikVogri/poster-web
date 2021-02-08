import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Prism } from "react-syntax-highlighter";
const CodeBlock = ({ block }) => {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(block.getText());
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <Box
      position="relative"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Prism language="javascript">{block.getText()}</Prism>
      <Button
        position="absolute"
        top="0"
        right="0"
        background="none"
        fontSize="14px"
        onClick={copyToClipboard}
        display={hovering ? "flex" : "none"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <title>Copy</title>
          <g fill="#303030">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
          </g>
        </svg>
        {copied && <Text>Copied</Text>}
      </Button>
    </Box>
  );
};

export default CodeBlock;
