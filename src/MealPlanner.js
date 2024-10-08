import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Text,
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
  SlideFade,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFire, FaDrumstickBite, FaCheese, FaBreadSlice, FaInfoCircle, FaFilePdf } from 'react-icons/fa';
import { BlobProvider } from '@react-pdf/renderer';
import calculateMacros from './calculateMacros';
import generateMealPlan from './generateMealPlan';
import MealSummary from './MealSummary';
import RestaurantLogo from './RestaurantLogo';
import Questionnaire from './Questionnaire';
import MealPlanPDF from './MealPlanPDF';

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
    exerciseFrequency: '',
    fitnessGoal: '',
    macroRatio: '',
    avoidFoods: [],
    cuisinePreferences: [],
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [pdfReady, setPdfReady] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("teal.600", "teal.200");

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (mealPlan && mealPlan.weekPlan) {
      setPdfReady(true);
    }
  }, [mealPlan]);

  const calculatePercentage = (actual, target) => {
    return Math.round((actual / target) * 100);
  };

  const handleGenerateMealPlan = (preferences = userInput) => {
    const { 
      weight, 
      height, 
      activityLevel, 
      gender, 
      mealCount, 
      selectedFoodSources, 
      exerciseFrequency, 
      dietaryRestrictions,
      fitnessGoal,
      macroRatio,
      avoidFoods,
      cuisinePreferences
    } = preferences;

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
        parseInt(exerciseFrequency),
        fitnessGoal,
        macroRatio
      );
      const mealsPerDay = parseInt(mealCount);
      const perMealMacros = {
        calories: Math.round(targetMacros.calories / mealsPerDay),
        protein: Math.round(targetMacros.protein / mealsPerDay),
        fat: Math.round(targetMacros.fat / mealsPerDay),
        carbs: Math.round(targetMacros.carbs / mealsPerDay),
      };

      const plan = generateMealPlan(
        targetMacros,
        perMealMacros,
        mealsPerDay,
        selectedFoodSources,
        dietaryRestrictions,
        avoidFoods,
        cuisinePreferences
      );
      setMealPlan({ weekPlan: plan, targetMacros, perMealMacros });
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionnaireSubmit = (preferences) => {
    setUserInput({
      weight: preferences.weight,
      height: preferences.height,
      activityLevel: preferences.activityLevel,
      gender: preferences.gender,
      mealCount: preferences.mealCount,
      selectedFoodSources: preferences.selectedFoodSources,
      dietaryRestrictions: preferences.dietaryRestrictions,
      exerciseFrequency: preferences.exerciseFrequency,
      fitnessGoal: preferences.fitnessGoal,
      macroRatio: preferences.macroRatio,
      avoidFoods: preferences.avoidFoods,
      cuisinePreferences: preferences.cuisinePreferences,
    });
    setShowQuestionnaire(false);
    handleGenerateMealPlan(preferences);
  };

  const foodSources = ['Chipotle', 'Subway', 'Just Salad', 'Panera Bread', 'Cava'];

  const isMobile = useBreakpointValue({ base: true, md: false });

  const MealCard = ({ meal, mealIndex }) => (
    <Box
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
          {meal.isSnack ? "Snack" : `Meal ${mealIndex + 1}`} - {meal.source}
        </Heading>
        {meal.isSnack && (
          <Badge colorScheme="blue">Protein Boost</Badge>
        )}
      </HStack>
      <List spacing={3}>
        {meal.foods.map((food, foodIndex) => (
          <ListItem key={foodIndex} py={2} borderBottomWidth={1} borderColor={borderColor}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="bold">
                  {food.name} {food.isHalfPortion ? '(Half Portion)' : ''}
                </Text>
                <Text fontSize="sm">
                  Serving Size: {food.isHalfPortion
                    ? `${food.servingSize}g (Half of ${food.originalServingSize}g)`
                    : `${food.servingSize}g`}
                </Text>
                <HStack spacing={4} mt={2} flexWrap="wrap">
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
              </VStack>
              {!meal.isSnack && (
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      icon={<FaInfoCircle />}
                      size="sm"
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="View ingredients"
                    />
                  </PopoverTrigger>
                  <PopoverContent bg={cardBgColor}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">Ingredients</PopoverHeader>
                    <PopoverBody>
                      <List>
                        {food.ingredients.map((ingredient, idx) => (
                          <ListItem key={idx}>{ingredient}</ListItem>
                        ))}
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </HStack>
          </ListItem>
        ))}
      </List>
      <MealSummary totalMacros={meal.totalMacros} />
    </Box>
  );

  const DailyMacroSummary = ({ dayPlan }) => (
    <Box mt={4}>
      <Heading as="h4" size="md" mb={2}>Daily Macro Summary</Heading>
      <Table variant="simple" colorScheme="teal">
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
              <Td>{Math.round(dayPlan.actualMacros[macro])}{macro !== 'calories' && 'g'}</Td>
              <Td>
                <Progress
                  value={calculatePercentage(dayPlan.actualMacros[macro], mealPlan.targetMacros[macro])}
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
    </Box>
  );

  return (
    <ChakraProvider>
      <Box maxWidth="1200px" margin="auto" padding="20px" bg={bgColor} minHeight="100vh">
        <VStack spacing={8} align="stretch">
          <Fade in={true}>
            <Heading as="h1" size="xl" textAlign="center" color={headingColor}>
              Personalized Weekly Meal Planner
            </Heading>
          </Fade>

          {showQuestionnaire ? (
            <Questionnaire onGenerateMealPlan={handleQuestionnaireSubmit} foodSources={foodSources} />
          ) : (
            <>
              {error && <Text color="red.500">{error}</Text>}

              {isLoading ? (
                <Spinner size="xl" />
              ) : (
                mealPlan && mealPlan.weekPlan && (
                  <SlideFade in={true} offsetY="20px">
                    <Box borderWidth={1} borderRadius="lg" p={6} bg={cardBgColor} borderColor={borderColor} boxShadow="md">
                      <Heading as="h2" size="lg" mb={4} color={headingColor}>Your Weekly Meal Plan</Heading>
                      
                      {pdfReady && (
                        <BlobProvider document={<MealPlanPDF mealPlan={mealPlan.weekPlan} targetMacros={mealPlan.targetMacros} />}>
                          {({ blob, url, loading, error }) => (
                            <Button
                              leftIcon={<FaFilePdf />}
                              colorScheme="teal"
                              isLoading={loading}
                              onClick={() => {
                                if (url) {
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.download = 'meal-plan.pdf';
                                  link.click();
                                }
                              }}
                              mb={4}
                              isFullWidth={isMobile}
                            >
                              Download PDF
                            </Button>
                          )}
                        </BlobProvider>
                      )}

                      {isMobile ? (
                        <Accordion allowMultiple>
                          {mealPlan.weekPlan.map((dayPlan, dayIndex) => (
                            <AccordionItem key={dayIndex}>
                              <h2>
                                <AccordionButton>
                                  <Box flex="1" textAlign="left">
                                    {daysOfWeek[dayIndex]}
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                <VStack spacing={4}>
                                  {dayPlan.meals.map((meal, mealIndex) => (
                                    <MealCard key={mealIndex} meal={meal} mealIndex={mealIndex} />
                                  ))}
                                  <DailyMacroSummary dayPlan={dayPlan} />
                                </VStack>
                              </AccordionPanel>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <Tabs isFitted variant="enclosed">
                          <TabList mb="1em">
                            {daysOfWeek.map((day, index) => (
                              <Tab key={index}>{day}</Tab>
                            ))}
                          </TabList>
                          <TabPanels>
                            {mealPlan.weekPlan.map((dayPlan, dayIndex) => (
                              <TabPanel key={dayIndex}>
                                <VStack spacing={6} align="stretch">
                                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                    {dayPlan.meals.map((meal, mealIndex) => (
                                      <GridItem key={mealIndex}>
                                        <MealCard meal={meal} mealIndex={mealIndex} />
                                      </GridItem>
                                    ))}
                                  </Grid>
                                  <DailyMacroSummary dayPlan={dayPlan} />
                                </VStack>
                              </TabPanel>
                            ))}
                          </TabPanels>
                        </Tabs>
                      )}
                    </Box>
                  </SlideFade>
                )
              )}
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default MealPlanner;
