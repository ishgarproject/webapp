import React, { useState, ChangeEventHandler } from 'react';
import {
  Stack,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import type { BaseNft } from '~/modules/types';
import { EthereumLogo } from '~/components';
import { ModalField } from './modal-field';

type IMakeOfferModal = BaseNft & { isActive: Boolean };

// TODO: Clean up
// TODO: check if user has enough funds
export const MakeOfferModal: React.FC<IMakeOfferModal> = ({
  tokenId,
  imageUri,
  collectionName,
  owner,
  collectionAddress,
  isActive,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [etherOffer, setEtherOffer] = useState<string>('');

  const submitOffer = () => {
    if (!+etherOffer || +etherOffer <= 0) {
      alert('offer must be a valid strictly positive number');
      return;
    }
  };

  const changeOffer: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setEtherOffer(value);
  };

  return (
    <>
      <Button variant="unstyled" size="sm" onClick={onOpen} color={isActive ? 'blue.500' : 'inherit'}>
        Make Offer
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack direction="column" spacing="4">
              <ModalField label="Item" imageUri={imageUri} />
              <ModalField label="Token Id" value={tokenId} />
              <ModalField label="Collection" value={collectionName} />
              <ModalField label="Current owner" value={owner.truncated} />
              <ModalField label="Collection Address" value={collectionAddress.truncated} />
              <Divider />
              <Text>Offer amount</Text>
              <InputGroup>
                <InputLeftElement>
                  <EthereumLogo />
                </InputLeftElement>
                <Input type="number" placeholder="Offer" value={etherOffer} onChange={changeOffer} />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={submitOffer}>
              Make Offer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
