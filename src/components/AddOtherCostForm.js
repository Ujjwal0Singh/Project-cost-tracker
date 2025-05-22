import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { addOtherCost } from '../features/otherCosts/otherCostsSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  Flex,
} from '@chakra-ui/react';

const AddOtherCostForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addOtherCost({
        userId: user.uid,
        cost: {
          description,
          amount: amountValue,
        },
      })).unwrap();
      
      setDescription('');
      setAmount('');
      toast({
        title: 'Cost added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add cost',
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
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <FormControl flex={2} isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Shipping, Taxes, Installation"
            />
          </FormControl>
          <FormControl flex={1} isRequired>
            <FormLabel>Amount</FormLabel>
            <NumberInput min={0} precision={2}>
              <NumberInputField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </NumberInput>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            alignSelf="flex-end"
            isLoading={isSubmitting}
            flex={{ base: '1', md: '0.5' }}
          >
            Add Cost
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default AddOtherCostForm;