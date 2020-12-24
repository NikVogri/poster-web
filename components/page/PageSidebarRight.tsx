import { Box, useStyles } from "@chakra-ui/react";
import { time } from "console";
import { useEffect, useState } from "react";
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
    <Box p={3} flex={1}>
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
  );
};

export default PageSidebarRight;
