import { useSelector } from 'react-redux';
import '../App.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import EditItemModal from './EditItemModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useState } from 'react';

const ItemsList = () => {
  const { items } = useSelector((state) => state.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    onEditOpen();
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    onDeleteOpen();
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Cost</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}  _hover={{ transform: "scale(1.02)", transition: "all 0.2s" }}>
              <Td>{item.name}</Td>
              <Td isNumeric>${parseFloat(item.cost).toFixed(2)}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditClick(item)}
                  mr={2}
                  aria-label="Edit item"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(item)}
                  aria-label="Delete item"
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedItem && (
        <>
          <EditItemModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            item={selectedItem}
          />
          <DeleteConfirmationDialog
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            item={selectedItem}
            type="item"
          />
        </>
      )}
    </Box>
  );
};

export default ItemsList;