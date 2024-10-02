import React from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const Navigation = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex maxW="container.xl" mx="auto" alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          Meal Planner
        </Heading>
        <Flex>
          <Button as={RouterLink} to="/" variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Home
          </Button>
          {user ? (
            <>
              <Button as={RouterLink} to="/meal-planner" variant="ghost" colorScheme="whiteAlpha" mr={2}>
                Plan Meals
              </Button>
              <Button onClick={handleLogout} variant="ghost" colorScheme="whiteAlpha">
                Logout
              </Button>
            </>
          ) : (
            <Button as={RouterLink} to="/auth" variant="ghost" colorScheme="whiteAlpha">
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;