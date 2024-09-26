import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, useColorModeValue, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Badge } from '@chakra-ui/react';
import { FaUtensils, FaChartPie, FaAppleAlt, FaClipboardCheck, FaFire, FaDrumstickBite, FaCheese, FaBreadSlice, FaClipboardList, FaCog, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import RestaurantLogo from './RestaurantLogo';

// Feature component for displaying key features
const Feature = ({ icon, title, text }) => {
  return (
    <VStack>
      <Icon as={icon} w={10} h={10} color="teal.500" />
      <Text fontWeight="bold" fontSize="xl">{title}</Text>
      <Text textAlign="center">{text}</Text>
    </VStack>
  );
};

// How It Works Step component
const HowItWorksStep = ({ icon, title, description }) => {
  return (
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
};

// Meal Plan Preview Component
const MealPlanPreview = () => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bgColor = useColorModeValue("white", "gray.700");

  const MacroIcon = ({ type }) => {
    switch (type) {
      case 'calories': return <Icon as={FaFire} />;
      case 'protein': return <Icon as={FaDrumstickBite} />;
      case 'fat': return <Icon as={FaCheese} />;
      case 'carbs': return <Icon as={FaBreadSlice} />;
      default: return null;
    }
  };

  const MealCard = ({ restaurant, meals, totals }) => (
    <Box borderWidth={1} borderRadius="lg" p={4} mb={4} borderColor={borderColor} bg={bgColor}>
      <HStack mb={2}>
        <RestaurantLogo source={restaurant} />
        <Heading size="md">{`Meal - ${restaurant}`}</Heading>
      </HStack>
      {meals.map((meal, index) => (
        <Box key={index} mb={2}>
          <Text fontWeight="bold">{meal.name}</Text>
          <Text fontSize="sm">Serving Size: {meal.servingSize}</Text>
          <HStack spacing={4}>
            <HStack><MacroIcon type="calories" /><Text fontSize="sm">{meal.calories} kcal</Text></HStack>
            <HStack><MacroIcon type="protein" /><Text fontSize="sm">{meal.protein}g</Text></HStack>
            <HStack><MacroIcon type="fat" /><Text fontSize="sm">{meal.fat}g</Text></HStack>
            <HStack><MacroIcon type="carbs" /><Text fontSize="sm">{meal.carbs}g</Text></HStack>
          </HStack>
        </Box>
      ))}
      <Box mt={2} p={2} bg={useColorModeValue("gray.100", "gray.600")} borderRadius="md">
        <Text fontWeight="bold">Meal Totals:</Text>
        <HStack spacing={4}>
          <HStack><MacroIcon type="calories" /><Text fontSize="sm">{totals.calories} kcal</Text></HStack>
          <HStack><MacroIcon type="protein" /><Text fontSize="sm">{totals.protein}g protein</Text></HStack>
          <HStack><MacroIcon type="fat" /><Text fontSize="sm">{totals.fat}g fat</Text></HStack>
          <HStack><MacroIcon type="carbs" /><Text fontSize="sm">{totals.carbs}g carbs</Text></HStack>
        </HStack>
      </Box>
    </Box>
  );

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} width="100%" maxWidth="800px" borderColor={borderColor} bg={bgColor}>
      <Heading size="lg" mb={4}>Your Weekly Meal Plan</Heading>
      <Tabs>
        <TabList>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <Tab key={day}>{day}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <MealCard
              restaurant="Just Salad"
              meals={[
                { name: "Forager's Warm Bowl", servingSize: "630g", calories: 630, protein: 25, fat: 29, carbs: 79 },
                { name: "Buffalo Chicken Wrap", servingSize: "560g", calories: 560, protein: 34, fat: 21, carbs: 61 }
              ]}
              totals={{ calories: 1190, protein: 59, fat: 50, carbs: 140 }}
            />
            <MealCard
              restaurant="Chipotle"
              meals={[
                { name: "Chicken Burrito Bowl", servingSize: "510g", calories: 510, protein: 50, fat: 17.5, carbs: 40 },
                { name: "Barbacoa Burrito Bowl", servingSize: "500g", calories: 500, protein: 42, fat: 17.5, carbs: 42 },
                { name: "Low Carb Chicken Burrito Bowl (Half Portion)", servingSize: "185g (Half of 370g)", calories: 185, protein: 21, fat: 8, carbs: 9 }
              ]}
              totals={{ calories: 1195, protein: 113, fat: 43, carbs: 91 }}
            />
            <MealCard
              restaurant="Subway"
              meals={[
                { name: "Chicken & Bacon Ranch Melt", servingSize: "254g", calories: 620, protein: 39, fat: 32, carbs: 43 },
                { name: "Chicken & Bacon Ranch", servingSize: "262g", calories: 580, protein: 35, fat: 29, carbs: 44 }
              ]}
              totals={{ calories: 1200, protein: 74, fat: 61, carbs: 87 }}
            />
          </TabPanel>
          {/* Add similar TabPanels for other days of the week */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

// Main Landing Page
const LandingPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const handleStartPlan = () => {
    navigate('/meal-planner');
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
              Personalized Meal Plans Made Easy
            </Heading>
            <Text fontSize="2xl" textAlign="center" mb={10} fontWeight="medium">
              Achieve your fitness goals with delicious meals from your favorite restaurants.
            </Text>
            <VStack spacing={6} mb={12} align="start" maxW="xl" mx="auto">
              {[
                "Customized weekly meal plans tailored to your preferences",
                "Choose from popular spots like Chipotle and Subway",
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
                Start Your Plan
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
              How It Works
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <HowItWorksStep
                icon={FaClipboardList}
                title="1. Share Your Preferences"
                description="Tell us about your dietary needs, favorite cuisines, and fitness goals through a quick questionnaire."
              />
              <HowItWorksStep
                icon={FaCog}
                title="2. We Generate Your Plan"
                description="Our smart algorithm creates a personalized weekly meal plan that fits your preferences and nutritional requirements."
              />
              <HowItWorksStep
                icon={FaCalendarAlt}
                title="3. Enjoy Your Meals"
                description="Follow your customized plan, track your progress, and enjoy delicious, balanced meals that help you reach your goals."
              />
            </SimpleGrid>
          </Box>

          {/* Sample Meal Plan Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={4}>
              Sample Meal Plan
            </Heading>
            <Text textAlign="center" mb={6}>
              Here's an example of what your personalized meal plan could look like:
            </Text>
            <Flex justifyContent="center">
              <Box
                width="100%"
                maxWidth="800px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
              >
                <Badge
                  colorScheme="teal"
                  position="absolute"
                  top={4}
                  right={4}  // Moved the badge to the right
                  zIndex={1}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  SAMPLE
                </Badge>
                <MealPlanPreview />
              </Box>
            </Flex>
          </Box>

          {/* Features Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={10}>
              Why Choose Our Meal Planner?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {[
                { icon: FaUtensils, title: "Personalized Meals", text: "Get meal plans tailored to your dietary preferences and restrictions." },
                { icon: FaChartPie, title: "Macro Tracking", text: "Easily track your daily intake of calories, protein, carbs, and fat." },
                { icon: FaAppleAlt, title: "Flexible Dieting", text: "Enjoy your favorite foods while still meeting your nutritional goals." },
                { icon: FaClipboardCheck, title: "Weekly Plans", text: "Receive a complete 7-day meal plan with detailed recipes and portions." }
              ].map((feature, index) => (
                <Box
                  key={feature.title}
                  _hover={{ transform: 'translateY(-5px)' }}
                  transition="all 0.3s"
                >
                  <Feature {...feature} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* CTA Section */}
          <Box textAlign="center" py={10}>
            <Heading as="h2" size="xl" mb={4}>
              Ready to Start Your Journey?
            </Heading>
            <Text fontSize="xl" mb={8}>
              Create your personalized meal plan in just a few minutes!
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleStartPlan}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Create Your Meal Plan
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
