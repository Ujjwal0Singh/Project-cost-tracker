import { useState } from 'react';
import Confetti from 'react-confetti';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/items/itemsSlice';
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

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    const costValue = parseFloat(cost);
    if (isNaN(costValue)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid cost',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addItem({
        userId: user.uid,
        item: {
          name,
          cost: costValue,
        },
      })).unwrap();
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setName('');
      setCost('');
      toast({
        title: 'Item added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add item',
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
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <Box borderWidth="1px" borderRadius="lg" p={4}  className="floating-card" bg="whiteAlpha.800" backdropFilter="blur(10px)">
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <FormControl flex={2} isRequired>
            <FormLabel>Item Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Laptop, Software License"
            />
          </FormControl>
          <FormControl flex={1} isRequired>
            <FormLabel>Cost</FormLabel>
            <NumberInput min={0} precision={2}>
              <NumberInputField
                value={cost}
                onChange={(e) => setCost(e.target.value)}
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
            Add Item
          </Button>
        </Flex>
      </form>
    </Box>
    </>
  );
};

export default AddItemForm;