import React from 'react';
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useMockERC721 } from '~/modules/hooks/use-contract';

export const MintModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mint } = useMockERC721(true);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Mint
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint an NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Mint some NFTs to try out the platform</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={mint}>
              Mint
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MintModal;
