import { useSelector } from 'react-redux';
import '../App.css';
import { Box, Heading, Text } from '@chakra-ui/react';

const TotalCost = () => {
  const items = useSelector((state) => state.items.items);
  const otherCosts = useSelector((state) => state.otherCosts.costs);

  const itemsTotal = items.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0);
  const otherCostsTotal = otherCosts.reduce((sum, cost) => sum + parseFloat(cost.amount || 0), 0);
  const total = itemsTotal + otherCostsTotal;

  return (
    <Box textAlign="right">
      <Text fontSize="sm" color="gray.500">
        Total Project Cost
      </Text>
      <Heading size="lg" className="total-cost">${total.toFixed(2)}</Heading>
    </Box>
  );
};

export default TotalCost;