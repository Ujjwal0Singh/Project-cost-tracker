import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../features/items/itemsSlice';
import { fetchOtherCosts } from '../features/otherCosts/otherCostsSlice';
import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import ItemsList from '../components/ItemsList';
import OtherCostsList from '../components/OtherCostsList';
import TotalCost from '../components/TotalCost';
import AddItemForm from '../components/AddItemForm';
import AddOtherCostForm from '../components/AddOtherCostForm';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItems(user.uid));
      dispatch(fetchOtherCosts(user.uid));
    }
  }, [dispatch, user]);

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Project Cost Tracker</Heading>
        <TotalCost />
      </Flex>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Items</Tab>
          <Tab>Other Costs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <AddItemForm />
              <ItemsList />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <AddOtherCostForm />
              <OtherCostsList />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;