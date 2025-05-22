import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateOtherCost } from '../features/otherCosts/otherCostsSlice';
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

const EditOtherCostModal = ({ isOpen, onClose, cost }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (cost) {
      setDescription(cost.description);
      setAmount(cost.amount);
    }
  }, [cost]);

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: 'Error',
        description: 'Description is required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: 'Error',
        description: 'Amount must be greater than 0',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateOtherCost({
        userId: cost.userId,
        costId: cost.id,
        cost: {
          description,
          amount: parseFloat(amount).toFixed(2),
        },
      })).unwrap();
      
      onClose();
      toast({
        title: 'Cost updated',
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
        <ModalHeader>Edit Cost</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <NumberInput min={0} precision={2} value={amount}>
              <NumberInputField
                onChange={(e) => setAmount(e.target.value)}
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

export default EditOtherCostModal;