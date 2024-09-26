import React from 'react';
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import MealPlanner from './MealPlanner';
import Navigation from './Navigation';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box backgroundColor="#F0F4F8" minHeight="100vh">
          <Navigation />
          <Box padding={8}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;