import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface PropsSaveBeforeUnloadModal {
  saveData: () => void;
  closeModal: () => void;
}

export const SaveBeforeUnloadModal: React.FC<PropsSaveBeforeUnloadModal> = ({
  saveData,
  closeModal,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModalHandler = () => {
    onClose();
    closeModal();
  };

  const onSave = () => {
    saveData();
    closeModal();
  };

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={closeModalHandler}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save before exiting</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>Please consider saving before exiting. </Text>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={closeModalHandler}>Cancel</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
