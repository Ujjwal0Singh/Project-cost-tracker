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
import EditOtherCostModal from './EditOtherCostModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useState } from 'react';

const OtherCostsList = () => {
  const { costs } = useSelector((state) => state.otherCosts);
  const [selectedCost, setSelectedCost] = useState(null);
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

  const handleEditClick = (cost) => {
    setSelectedCost(cost);
    onEditOpen();
  };

  const handleDeleteClick = (cost) => {
    setSelectedCost(cost);
    onDeleteOpen();
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {costs.map((cost) => (
            <Tr key={cost.id}>
              <Td>{cost.description}</Td>
              <Td isNumeric>${parseFloat(cost.amount).toFixed(2)}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditClick(cost)}
                  mr={2}
                  aria-label="Edit cost"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(cost)}
                  aria-label="Delete cost"
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedCost && (
        <>
          <EditOtherCostModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            cost={selectedCost}
          />
          <DeleteConfirmationDialog
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            item={selectedCost}
            type="otherCost"
          />
        </>
      )}
    </Box>
  );
};

export default OtherCostsList;