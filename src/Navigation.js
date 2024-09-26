import React from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
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
          <Button as={RouterLink} to="/meal-planner" variant="ghost" colorScheme="whiteAlpha">
            Plan Meals
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;