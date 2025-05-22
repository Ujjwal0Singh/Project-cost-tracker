import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteItem } from '../features/items/itemsSlice';
import { deleteOtherCost } from '../features/otherCosts/otherCostsSlice';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';

const DeleteConfirmationDialog = ({ isOpen, onClose, item, type }) => {
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (type === 'item') {
        await dispatch(deleteItem({
          userId: item.userId,
          itemId: item.id,
        })).unwrap();
      } else {
        await dispatch(deleteOtherCost({
          userId: item.userId,
          costId: item.id,
        })).unwrap();
      }
      
      onClose();
      toast({
        title: `${type === 'item' ? 'Item' : 'Cost'} deleted`,
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
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {type === 'item' ? 'Item' : 'Cost'}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this {type === 'item' ? 'item' : 'cost'}? This action cannot be undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;