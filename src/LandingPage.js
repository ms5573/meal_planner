import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { FaUtensils, FaChartPie, FaAppleAlt, FaClipboardCheck, FaCheck, FaClipboardList, FaCog, FaCalendarAlt } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import RestaurantLogo from './RestaurantLogo';

// Feature component for displaying key features
const Feature = ({ icon, title, text }) => (
  <VStack>
    <Icon as={icon} w={10} h={10} color="teal.500" />
    <Text fontWeight="bold" fontSize="xl">{title}</Text>
    <Text textAlign="center">{text}</Text>
  </VStack>
);

// How It Works Step component
const HowItWorksStep = ({ icon, title, description }) => (
  <VStack
    align="start"
    spacing={4}
    p={6}
    bg={useColorModeValue("white", "gray.700")}
    borderRadius="lg"
    boxShadow="md"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
  >
    <Flex
      w={12}
      h={12}
      align="center"
      justify="center"
      borderRadius="full"
      bg="teal.500"
      color="white"
    >
      <Icon as={icon} w={6} h={6} />
    </Flex>
    <Heading size="md">{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

// Main Landing Page component
const LandingPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const bgColor = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    if (user) {
      navigate('/meal-planner');
    }
  }, [user, navigate]);

  const handleStartPlan = () => {
    if (user) {
      navigate('/meal-planner');
    } else {
      navigate('/auth');
    }
  };

  const FeatureTag = ({ children }) => (
    <Box
      bg="teal.500"
      color="white"
      px={4}
      py={2}
      borderRadius="full"
      fontWeight="bold"
      fontSize="lg"
      boxShadow="md"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
      transition="all 0.2s"
    >
      {children}
    </Box>
  );

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" pt={20}>
        <VStack spacing={20} align="stretch">
          {/* Hero Section */}
          <Box>
            <Heading as="h1" size="2xl" color="teal.500" textAlign="center" mb={6}>
              Welcome to FuelMate
            </Heading>
            <Text fontSize="2xl" textAlign="center" mb={10} fontWeight="medium">
              Your personal nutrition assistant for achieving fitness goals with delicious restaurant meals.
            </Text>
            <VStack spacing={6} mb={12} align="start" maxW="xl" mx="auto">
              {[
                "Customized weekly meal plans tailored to your preferences",
                "Choose from popular restaurants like Chipotle and Subway",
                "Effortless tracking for weight loss or muscle gain",
                "Flexible options that fit your lifestyle"
              ].map((text, index) => (
                <HStack key={index} spacing={4}>
                  <Icon as={FaCheck} color="green.500" boxSize={6} />
                  <Text fontSize="xl">{text}</Text>
                </HStack>
              ))}
            </VStack>
            <Flex justify="center" mb={12}>
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleStartPlan}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              >
                Start Your FuelMate Plan
              </Button>
            </Flex>
            <Flex justify="center" wrap="wrap" gap={4}>
              <FeatureTag>Easy</FeatureTag>
              <FeatureTag>Flexible</FeatureTag>
              <FeatureTag>Personalized</FeatureTag>
              <FeatureTag>Delicious</FeatureTag>
            </Flex>
          </Box>

          {/* How It Works Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={10}>
              How FuelMate Works
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <HowItWorksStep
                icon={FaClipboardList}
                title="1. Share Your Preferences"
                description="Tell FuelMate about your dietary needs, favorite cuisines, and fitness goals through a quick questionnaire."
              />
              <HowItWorksStep
                icon={FaCog}
                title="2. FuelMate Generates Your Plan"
                description="Our smart algorithm creates a personalized weekly meal plan that fits your preferences and nutritional requirements."
              />
              <HowItWorksStep
                icon={FaCalendarAlt}
                title="3. Enjoy Your FuelMate Meals"
                description="Follow your customized plan, track your progress, and enjoy delicious, balanced meals that help you reach your goals."
              />
            </SimpleGrid>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center" py={10}>
            <Heading as="h2" size="xl" mb={4}>
              Ready to Start Your FuelMate Journey?
            </Heading>
            <Text fontSize="xl" mb={8}>
              Create your personalized FuelMate plan in just a few minutes!
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleStartPlan}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Create Your FuelMate Plan
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
