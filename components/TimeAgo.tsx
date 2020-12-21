import { Text } from "@chakra-ui/react";
import InitTimeAgo from "javascript-time-ago";

import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";

InitTimeAgo.getDefaultLocale();
InitTimeAgo.addLocale(en);

const TimeAgo = ({ type, date }) => {
  return (
    <Text>
      Last {type}: <ReactTimeAgo date={date} locale="en-US" />
    </Text>
  );
};

export default TimeAgo;
