import React from 'react';
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import MealPlanner from './MealPlanner';
import Navigation from './Navigation';
import Auth from './Auth';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box backgroundColor="#F0F4F8" minHeight="100vh">
          <Navigation />
          <Box padding={8}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/meal-planner" 
                element={
                  <ProtectedRoute>
                    <MealPlanner />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;