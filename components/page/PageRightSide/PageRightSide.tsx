// import { AvatarGroup, Box, Text, Avatar, Button, Flex } from "@chakra-ui/react";
// import React, { useContext, useEffect, useState } from "react";
// import { User } from "../../interfaces/user";
// import { EditorContext } from "../context/EditorContext";
// import TimeAgo from "../TimeAgo";
// import InviteMembersModal from "../InviteMembersModal";

import OtherPages from "../OtherPages/OtherPages";
import PageMembers from "../PageMembers/PageMembers";
import PageSettings from "../PageSettings/PageSettings";
import styles from "./PageRightSide.module.scss";

// interface PageSidebarRightProps {
//   members: User[];
//   pageOwner: User;
//   pageSlug: string;
//   isOwner: boolean;
// }

// const TIME_BEFORE_NOTIF = 60 * 1000; // 60 secs

// const PageSidebarRight: React.FC<PageSidebarRightProps> = ({
//   members,
//   pageSlug,
//   isOwner,
//   pageOwner,
// }) => {
//   const [displayNotification, setDisplayNotification] = useState(false);
//   const [showInviteModal, setInviteModal] = useState(false);
//   const { save } = useContext(EditorContext);

//   useEffect(() => {
//     let notificationTimeout: any;

//     if (save.saveIsAvailable) {
//       notificationTimeout = setTimeout(() => {
//         setDisplayNotification(true);
//       }, TIME_BEFORE_NOTIF);
//     } else {
//       setDisplayNotification(false);
//       clearTimeout(notificationTimeout);
//     }
//   }, [save.saveIsAvailable]);

//   return (
//     <>
//       <Box
//         p={3}
//         flex={1}
//         border="none"
//         borderLeft="solid"
//         borderColor="gray.200"
//         borderWidth={1}
//       >
//         <Box>
//           <Flex alignItems="center" mb={3}>
//             <Text fontWeight="bold" fontSize="lg">
//               Page Members{" "}
//               {members.length > 0 ? "(" + (members.length + 1) + ")" : 1}
//             </Text>
//             {isOwner && (
//               <Button
//                 mt={2}
//                 size="xs"
//                 m={0}
//                 ml={2}
//                 onClick={() => setInviteModal(true)}
//               >
//                 +
//               </Button>
//             )}
//           </Flex>
//           <AvatarGroup size="md" max={3} mb={3}>
//             <Avatar
//               name={pageOwner.username}
//               src={pageOwner.avatar}
//               title={pageOwner.username}
//               border="none"
//             />
//             {members.map((member) => (
//               <Avatar
//                 key={member.id}
//                 name={member.username}
//                 src={member.avatar}
//                 title={member.username}
//               />
//             ))}
//           </AvatarGroup>
//           <hr />
//         </Box>
//         <Box mt={3}>
//           {displayNotification && (
//             <TimeAgo
//               type="saved"
//               date={save.lastSaveTime}
//               border="solid"
//               borderWidth={1}
//               borderColor="red.200"
//               color="red.300"
//               borderRadius="5px"
//               fontWeight="bold"
//               px={2}
//             />
//           )}
//         </Box>
//       </Box>
//       <InviteMembersModal
//         showModal={showInviteModal}
//         closeModal={() => setInviteModal(false)}
//         pageSlug={pageSlug}
//       />
//     </>
//   );
// };

// export default PageSidebarRight;

const PageRightSide: React.FC = () => {
	return (
		<aside className={styles.page__right}>
			<PageSettings />
			<PageMembers />
		</aside>
	);
};

export default PageRightSide;
