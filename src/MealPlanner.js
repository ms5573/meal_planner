// MealPlanner.js
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  Progress,
  useColorModeValue,
  Fade,
  ScaleFade,
  SlideFade,
} from "@chakra-ui/react";
import { FaFire, FaDrumstickBite, FaCheese, FaBreadSlice } from 'react-icons/fa';
import calculateMacros from './calculateMacros';
import generateMealPlan from './generateMealPlan';
import MealSummary from './MealSummary';
import RestaurantLogo from './RestaurantLogo';
import Questionnaire from './Questionnaire';

// MacroIcon component for displaying icons
const MacroIcon = ({ type }) => {
  const iconColors = useColorModeValue(
    {
      calories: "red.500",
      protein: "green.500",
      fat: "yellow.500",
      carbs: "purple.500"
    },
    {
      calories: "red.300",
      protein: "green.300",
      fat: "yellow.300",
      carbs: "purple.300"
    }
  );

  switch (type) {
    case 'calories': return <FaFire color={iconColors.calories} />;
    case 'protein': return <FaDrumstickBite color={iconColors.protein} />;
    case 'fat': return <FaCheese color={iconColors.fat} />;
    case 'carbs': return <FaBreadSlice color={iconColors.carbs} />;
    default: return null;
  }
};

const MealPlanner = () => {
  const [userInput, setUserInput] = useState({
    weight: '',
    height: '',
    activityLevel: '',
    gender: 'male',
    mealCount: '3',
    selectedFoodSources: [],
    dietaryRestrictions: [],
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [userPreferences, setUserPreferences] = useState(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("teal.600", "teal.200");

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const calculatePercentage = (actual, target) => {
    return Math.round((actual / target) * 100);
  };

  const handleGenerateMealPlan = (preferences = userInput) => {
    const { weight, height, activityLevel, gender, mealCount, selectedFoodSources, exerciseFrequency, dietaryRestrictions } = preferences;
    if (!weight || !height || !activityLevel || !mealCount || selectedFoodSources.length === 0) {
      setError('Please fill in all fields and select at least one food source');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const targetMacros = calculateMacros(
        parseFloat(weight),
        parseFloat(height),
        activityLevel,
        gender,
        parseInt(exerciseFrequency)
      );
      const mealsPerDay = parseInt(mealCount);
      const perMealMacros = {
        calories: Math.round(targetMacros.calories / mealsPerDay),
        protein: Math.round(targetMacros.protein / mealsPerDay),
        fat: Math.round(targetMacros.fat / mealsPerDay),
        carbs: Math.round(targetMacros.carbs / mealsPerDay),
      };

      // Pass selectedFoodSources and dietaryRestrictions to generateMealPlan
      const plan = generateMealPlan(targetMacros, perMealMacros, mealsPerDay, selectedFoodSources, dietaryRestrictions);
      setMealPlan({ ...plan, targetMacros, perMealMacros });
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionnaireSubmit = (preferences) => {
    setUserPreferences(preferences);
    setUserInput({
      weight: preferences.weight,
      height: preferences.height,
      activityLevel: preferences.activityLevel,
      gender: preferences.gender,
      mealCount: preferences.mealCount,
      selectedFoodSources: preferences.selectedFoodSources,
      dietaryRestrictions: preferences.dietaryRestrictions,
    });
    setShowQuestionnaire(false);
    handleGenerateMealPlan(preferences);
  };

  const foodSources = ['Chipotle', 'Subway', 'Just Salad', 'Panera Bread', 'Cava'];

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding="20px" bg={bgColor} minHeight="100vh">
        <VStack spacing={8} align="stretch">
          <Fade in={true}>
            <Heading as="h1" size="xl" textAlign="center" color={headingColor}>
              Personalized Meal Planner
            </Heading>
          </Fade>

          {showQuestionnaire ? (
            <Questionnaire onGenerateMealPlan={handleQuestionnaireSubmit} foodSources={foodSources} />
          ) : (
            <>
              <ScaleFade initialScale={0.9} in={true}>
                <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor} bg={cardBgColor}>
                  <VStack spacing={4}>
                    <HStack spacing={4} width="100%">
                      <Input
                        name="weight"
                        placeholder="Weight (kg)"
                        value={userInput.weight}
                        onChange={handleInputChange}
                        type="number"
                        isRequired
                      />
                      <Input
                        name="height"
                        placeholder="Height (cm)"
                        value={userInput.height}
                        onChange={handleInputChange}
                        type="number"
                        isRequired
                      />
                    </HStack>

                    <Select
                      name="activityLevel"
                      value={userInput.activityLevel}
                      onChange={handleInputChange}
                      placeholder="Select Activity Level"
                      isRequired
                    >
                      <option value="1.2">Sedentary</option>
                      <option value="1.375">Lightly Active</option>
                      <option value="1.55">Moderately Active</option>
                      <option value="1.725">Very Active</option>
                      <option value="1.9">Extra Active</option>
                    </Select>

                    <HStack spacing={4} width="100%">
                      <Select
                        name="gender"
                        value={userInput.gender}
                        onChange={handleInputChange}
                        isRequired
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                      <Select
                        name="mealCount"
                        value={userInput.mealCount}
                        onChange={handleInputChange}
                        isRequired
                      >
                        <option value="1">1 Meal</option>
                        <option value="2">2 Meals</option>
                        <option value="3">3 Meals</option>
                        <option value="4">4 Meals</option>
                        <option value="5">5 Meals</option>
                      </Select>
                    </HStack>

                    <Button
                      onClick={() => handleGenerateMealPlan()}
                      isLoading={isLoading}
                      colorScheme="teal"
                      size="lg"
                      width="100%"
                      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                      transition="all 0.2s"
                    >
                      Generate Meal Plan
                    </Button>
                  </VStack>
                </Box>
              </ScaleFade>

              {error && <Text color="red.500">{error}</Text>}

              {mealPlan && (
                <SlideFade in={true} offsetY="20px">
                  <Box borderWidth={1} borderRadius="lg" p={6} bg={cardBgColor} borderColor={borderColor} boxShadow="md">
                    <Heading as="h2" size="lg" mb={4} color={headingColor}>Your Meal Plan</Heading>

                    <Table variant="simple" colorScheme="teal" mb={6}>
                      <Thead>
                        <Tr>
                          <Th>Macro</Th>
                          <Th>Target</Th>
                          <Th>Actual</Th>
                          <Th>Percentage</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {['calories', 'protein', 'fat', 'carbs'].map(macro => (
                          <Tr key={macro}>
                            <Td>
                              <HStack>
                                <MacroIcon type={macro} />
                                <Text>{macro.charAt(0).toUpperCase() + macro.slice(1)}</Text>
                              </HStack>
                            </Td>
                            <Td>{mealPlan.targetMacros[macro]}{macro !== 'calories' && 'g'}</Td>
                            <Td>{Math.round(mealPlan.actualMacros[macro])}{macro !== 'calories' && 'g'}</Td>
                            <Td>
                              <Progress
                                value={calculatePercentage(mealPlan.actualMacros[macro], mealPlan.targetMacros[macro])}
                                size="sm"
                                colorScheme={
                                  macro === 'calories' ? 'red' :
                                  macro === 'protein' ? 'green' :
                                  macro === 'fat' ? 'yellow' : 'purple'
                                }
                                borderRadius="full"
                              />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>

                    {mealPlan.meals.map((meal, mealIndex) => (
                      <ScaleFade initialScale={0.95} in={true} key={mealIndex}>
                        <Box
                          mt={6}
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                          borderWidth={1}
                          borderColor={borderColor}
                          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                          transition="all 0.2s"
                        >
                          <HStack spacing={4} align="center" mb={2}>
                            <RestaurantLogo source={meal.source} />
                            <Heading as="h3" size="md" color={headingColor}>
                              Meal {mealIndex + 1} - {meal.source}
                            </Heading>
                          </HStack>
                          <List spacing={3}>
                            {meal.foods.map((food, foodIndex) => (
                              <ListItem key={foodIndex} py={2} borderBottomWidth={1} borderColor={borderColor}>
                                <Text fontWeight="bold">
                                  {food.name} {food.isHalfPortion ? '(Half Portion)' : ''}
                                </Text>
                                <Text fontSize="sm">
                                  Serving Size: {food.isHalfPortion
                                    ? `${food.servingSize}g (Half of ${food.originalServingSize}g)`
                                    : `${food.servingSize}g`}
                                </Text>
                                <HStack spacing={4} mt={2}>
                                  <HStack>
                                    <MacroIcon type="calories" />
                                    <Text fontSize="sm">{food.calories} kcal</Text>
                                  </HStack>
                                  <HStack>
                                    <MacroIcon type="protein" />
                                    <Text fontSize="sm">{food.protein}g</Text>
                                  </HStack>
                                  <HStack>
                                    <MacroIcon type="fat" />
                                    <Text fontSize="sm">{food.fat}g</Text>
                                  </HStack>
                                  <HStack>
                                    <MacroIcon type="carbs" />
                                    <Text fontSize="sm">{food.carbs}g</Text>
                                  </HStack>
                                </HStack>
                              </ListItem>
                            ))}
                          </List>
                          <MealSummary totalMacros={meal.totalMacros} />
                        </Box>
                      </ScaleFade>
                    ))}
                  </Box>
                </SlideFade>
              )}
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default MealPlanner;
