import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout } from '../features/auth/authSlice';
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="blue.600" color="white" px={4} py={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Project Cost Tracker
        </Text>
        {user ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {user.email}
            </MenuButton>
            <MenuList color="black">
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex>
            <Button as={Link} to="/login" variant="ghost" mr={2}>
              Login
            </Button>
            <Button as={Link} to="/signup" colorScheme="blue">
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;