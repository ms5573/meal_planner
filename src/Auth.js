import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Box, VStack, Heading, Input, Button, Text, Divider, useToast } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate('/meal-planner');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast({
        title: "Google Sign-In Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (user) {
    return (
      <Box textAlign="center" mt={8}>
        <Text mb={4}>Welcome, {user.email}!</Text>
        <Button onClick={logOut} colorScheme="red">Log Out</Button>
      </Box>
    );
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading textAlign="center">{isSignUp ? 'Create Account' : 'Sign In'}</Heading>
        <form onSubmit={handleAuth}>
          <VStack spacing={4}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="teal" width="full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </VStack>
        </form>
        <Divider />
        <Button
          onClick={handleGoogleSignIn}
          leftIcon={<FaGoogle />}
          colorScheme="red"
          variant="outline"
        >
          Sign in with Google
        </Button>
        <Text textAlign="center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => setIsSignUp(!isSignUp)}
            ml={2}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Text>
      </VStack>
    </Box>
  );
}

export default Auth;