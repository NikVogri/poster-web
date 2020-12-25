import {
  bold,
  italic,
  strikethrough,
  code,
  underline,
  quote,
  link,
} from "../icons/icons";

interface widget {
  name: string;
  icon?: JSX.Element | string;
}

interface RichStyleWidgets extends widget {
  type: "richtext";
}

interface ContentBlockWidgets extends widget {
  type: "block";
}

export const richStyleWidgets: RichStyleWidgets[] = [
  {
    name: "BOLD",
    icon: bold,
    type: "richtext",
  },
  {
    name: "ITALIC",
    icon: italic,
    type: "richtext",
  },
  {
    name: "STRIKETHROUGH",
    icon: strikethrough,
    type: "richtext",
  },
  {
    name: "UNDERLINE",
    icon: underline,
    type: "richtext",
  },
  {
    name: "CODE",
    icon: code,
    type: "richtext",
  },
];

export const contentBlockWidgets: ContentBlockWidgets[] = [
  {
    name: "blockquote",
    icon: quote,
    type: "block",
  },
  {
    name: "LINK",
    icon: link,
    type: "block",
  },
  {
    name: "header-one",
    icon: "H1",
    type: "block",
  },
  {
    name: "header-two",
    icon: "H2",
    type: "block",
  },
  {
    name: "header-three",
    icon: "H3",
    type: "block",
  },
  {
    name: "header-four",
    icon: "H4",
    type: "block",
  },
  {
    name: "header-five",
    icon: "H5",
    type: "block",
  },
  {
    name: "header-six",
    icon: "H6",
    type: "block",
  },
];
