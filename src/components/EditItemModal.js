import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/items/itemsSlice';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';

const EditItemModal = ({ isOpen, onClose, item }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCost(item.cost);
    }
  }, [item]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Name is required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseFloat(cost) <= 0) {
      toast({
        title: 'Error',
        description: 'Cost must be greater than 0',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateItem({
        userId: item.userId,
        itemId: item.id,
        item: {
          name,
          cost: parseFloat(cost).toFixed(2),
        },
      })).unwrap();
      
      onClose();
      toast({
        title: 'Item updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cost</FormLabel>
            <NumberInput min={0} precision={2} value={cost}>
              <NumberInputField
                onChange={(e) => setCost(e.target.value)}
              />
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditItemModal;