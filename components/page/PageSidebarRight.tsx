import { AvatarGroup, Box, Text, Avatar } from "@chakra-ui/react";
import { time } from "console";
import React, { useEffect, useState } from "react";
import { timeSinceInMinutes } from "../../helpers/timeSince";
import TimeAgo from "../TimeAgo";

const TIME_BEFORE_NOTIF = 60 * 1000; // 60 secs

const PageSidebarRight = ({ lastSave, saveIsAvailable }) => {
  const [displayNotification, setDisplayNotification] = useState(false);

  useEffect(() => {
    let notificationTimeout: any;

    if (saveIsAvailable) {
      notificationTimeout = setTimeout(() => {
        setDisplayNotification(true);
      }, TIME_BEFORE_NOTIF);
    } else {
      setDisplayNotification(false);
      clearTimeout(notificationTimeout);
    }
  }, [saveIsAvailable]);

  return (
    <Box
      p={3}
      flex={1}
      border="none"
      borderLeft="solid"
      borderColor="gray.200"
      borderWidth={1}
    >
      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={3}>
          Members
        </Text>
        <AvatarGroup size="md" max={3} mb={3}>
          <Avatar
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
            title="Ryan Florence"
          />
          <Avatar
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
            title="Segun Adebayo"
          />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>
        <hr />
      </Box>
      <Box mt={3}>
        {displayNotification && (
          <TimeAgo
            type="saved"
            date={lastSave}
            border="solid"
            borderWidth={1}
            borderColor="red.200"
            color="red.300"
            borderRadius="5px"
            fontWeight="bold"
            px={2}
          />
        )}
      </Box>
    </Box>
  );
};

export default PageSidebarRight;
