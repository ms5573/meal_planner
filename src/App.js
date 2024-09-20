import React from 'react';
import { ChakraProvider, Box, VStack, Heading } from "@chakra-ui/react";
import MealPlanner from './MealPlanner';

function App() {
  return (
    <ChakraProvider>
      <Box backgroundColor="#F0F4F8" minHeight="100vh" padding={8}>
        <VStack spacing={8} align="stretch" maxWidth="1200px" margin="auto">
          <Heading as="h1" size="2xl" textAlign="center" color="#2C3E50">
            Meal Planner Application
          </Heading>
          <MealPlanner />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;