import React, { useState, useEffect } from 'react';
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
import { FaFire, FaDrumstickBite, FaCheese, FaBreadSlice, FaFilePdf } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text as PDFText, View, StyleSheet } from '@react-pdf/renderer';
import calculateMacros from './calculateMacros';
import generateMealPlan from './generateMealPlan';
import MealSummary from './MealSummary';
import RestaurantLogo from './RestaurantLogo';
import ThirtyDayPlanPDF from './ThirtyDayPlan';

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

// PDF styling
const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  mealTitle: { fontSize: 18, marginTop: 15, marginBottom: 10 },
  food: { fontSize: 12, marginBottom: 3 },
  macros: { fontSize: 12, marginTop: 5 },
});

// PDF Document component for 30-day meal plan
const PdfDocument = ({ mealPlan }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <PDFText style={pdfStyles.title}>Your 30-Day Meal Plan</PDFText>
      {mealPlan.thirtyDayPlan.map((dailyPlan, dayIndex) => (
        <View key={dayIndex}>
          <PDFText style={pdfStyles.mealTitle}>Day {dayIndex + 1}</PDFText>
          {dailyPlan.meals.map((meal, mealIndex) => (
            <View key={mealIndex}>
              <PDFText style={pdfStyles.mealTitle}>Meal {mealIndex + 1} - {meal.source}</PDFText>
              {meal.foods.map((food, foodIndex) => (
                <PDFText key={foodIndex} style={pdfStyles.food}>
                  {food.name} - {food.servingSize}g 
                  (Calories: {food.calories}, Protein: {food.protein}g, Fat: {food.fat}g, Carbs: {food.carbs}g)
                </PDFText>
              ))}
              <PDFText style={pdfStyles.macros}>
                Meal Totals - Calories: {meal.totalMacros.calories}, Protein: {meal.totalMacros.protein}g, 
                Fat: {meal.totalMacros.fat}g, Carbs: {meal.totalMacros.carbs}g
              </PDFText>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

const MealPlanner = () => {
  const [userInput, setUserInput] = useState({
    weight: '',
    height: '',
    activityLevel: '',
    gender: 'male',
    mealCount: '3',
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("teal.600", "teal.200");

  // Log mealPlan whenever it is updated
  useEffect(() => {
    console.log("mealPlan state updated:", mealPlan);
  }, [mealPlan]);

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const calculatePercentage = (actual, target) => {
    return Math.round((actual / target) * 100);
  };

  const handleGenerateMealPlan = () => {
    console.log("handleGenerateMealPlan called");
    const { weight, height, activityLevel, gender, mealCount } = userInput;
    if (!weight || !height || !activityLevel || !mealCount) {
      console.log("Missing input fields");
      setError('Please fill in all fields');
      return;
    }

    console.log("All fields filled, proceeding to generate meal plan");
    setIsLoading(true);
    setError(null);

    try {
      console.log("Calculating macros");
      const targetMacros = calculateMacros(parseFloat(weight), parseFloat(height), activityLevel, gender);
      console.log("Target macros calculated:", targetMacros);

      const mealsPerDay = parseInt(mealCount);
      const perMealMacros = {
        calories: Math.round(targetMacros.calories / mealsPerDay),
        protein: Math.round(targetMacros.protein / mealsPerDay),
        fat: Math.round(targetMacros.fat / mealsPerDay),
        carbs: Math.round(targetMacros.carbs / mealsPerDay),
      };
      console.log("Per meal macros calculated:", perMealMacros);

      console.log("Generating meal plan");
      const plan = generateMealPlan(targetMacros, perMealMacros, mealsPerDay);
      console.log("Meal plan generated:", plan);

      setMealPlan({ thirtyDayPlan: plan, targetMacros });
      console.log("Meal plan set to state");
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setError('An error occurred while generating the meal plan. Please try again.');
    } finally {
      setIsLoading(false);
      console.log("Loading state set to false");
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding="20px" bg={bgColor} minHeight="100vh">
        <VStack spacing={8} align="stretch">
          <Fade in={true}>
            <Heading as="h1" size="xl" textAlign="center" color={headingColor}>
              Personalized Meal Planner
            </Heading>
          </Fade>

          <ScaleFade initialScale={0.9} in={true}>
            <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor} bg={cardBgColor}>
              <VStack spacing={4}>
                <HStack spacing={4} width="100%">
                  <Input name="weight" placeholder="Weight (kg)" value={userInput.weight} onChange={handleInputChange} type="number" />
                  <Input name="height" placeholder="Height (cm)" value={userInput.height} onChange={handleInputChange} type="number" />
                </HStack>

                <Select name="activityLevel" value={userInput.activityLevel} onChange={handleInputChange} placeholder="Select Activity Level">
                  <option value="1.2">Sedentary</option>
                  <option value="1.375">Lightly Active</option>
                  <option value="1.55">Moderately Active</option>
                  <option value="1.725">Very Active</option>
                  <option value="1.9">Extra Active</option>
                </Select>

                <HStack spacing={4} width="100%">
                  <Select name="gender" value={userInput.gender} onChange={handleInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                  <Select name="mealCount" value={userInput.mealCount} onChange={handleInputChange}>
                    <option value="1">1 Meal</option>
                    <option value="2">2 Meals</option>
                    <option value="3">3 Meals</option>
                    <option value="4">4 Meals</option>
                    <option value="5">5 Meals</option>
                  </Select>
                </HStack>

                <Button
                  onClick={handleGenerateMealPlan}
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

          {mealPlan && mealPlan.thirtyDayPlan && mealPlan.thirtyDayPlan.length > 0 && (
            <SlideFade in={true} offsetY="20px">
              <Box borderWidth={1} borderRadius="lg" p={6} bg={cardBgColor} borderColor={borderColor} boxShadow="md">
                <Heading as="h2" size="lg" mb={4} color={headingColor}>Your 30-Day Meal Plan</Heading>

                {/* Display only the first day's plan for brevity */}
                {mealPlan.thirtyDayPlan[0].meals.map((meal, mealIndex) => (
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
                        {meal.foods && meal.foods.map((food, foodIndex) => (
                          <ListItem key={foodIndex} py={2} borderBottomWidth={1} borderColor={borderColor}>
                            <Text fontWeight="bold">{food.name} {food.isHalfPortion ? '(Half Portion)' : ''}</Text>
                            <Text fontSize="sm">Serving Size: {food.servingSize}g</Text>
                            <HStack spacing={4} mt={2}>
                              <HStack><MacroIcon type="calories" /><Text fontSize="sm">{food.calories} kcal</Text></HStack>
                              <HStack><MacroIcon type="protein" /><Text fontSize="sm">{food.protein}g</Text></HStack>
                              <HStack><MacroIcon type="fat" /><Text fontSize="sm">{food.fat}g</Text></HStack>
                              <HStack><MacroIcon type="carbs" /><Text fontSize="sm">{food.carbs}g</Text></HStack>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                      {meal.totalMacros && <MealSummary totalMacros={meal.totalMacros} />}
                    </Box>
                  </ScaleFade>
                ))}
                
                <Text mt={4}>Note: This is showing the meal plan for Day 1. The full 30-day plan has been generated.</Text>
                
                <PDFDownloadLink
                  document={<ThirtyDayPlanPDF mealPlan={mealPlan} />}
                  fileName="30_day_meal_plan.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <Button
                      mt={4}
                      leftIcon={<FaFilePdf />}
                      colorScheme="teal"
                      isLoading={loading}
                      loadingText="Generating PDF"
                    >
                      {loading ? 'Generating PDF' : 'Download Full 30-Day Plan (PDF)'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Box>
            </SlideFade>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default MealPlanner;
