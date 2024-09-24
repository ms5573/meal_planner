import React, { useState, useCallback } from 'react';
import {
  VStack, HStack, FormControl, Input, Select, Checkbox, CheckboxGroup,
  Radio, RadioGroup, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Box, SimpleGrid, useColorModeValue, Progress, Icon, Flex, Heading, keyframes, Text,
} from "@chakra-ui/react";
import {
  FaWeight, FaRulerVertical, FaVenusMars, FaRunning, FaAppleAlt, FaUtensils,
  FaDumbbell, FaBalanceScale, FaStore, FaRocket,
} from 'react-icons/fa';

const Questionnaire = ({ onGenerateMealPlan, foodSources }) => {
  const [preferences, setPreferences] = useState({
    weight: '',
    height: '',
    activityLevel: '',
    gender: '',
    mealCount: 3,
    exerciseFrequency: 3,
    dietaryRestrictions: [],
    cuisinePreferences: [],
    avoidFoods: '',
    fitnessGoal: '',
    macroRatio: '',
    weightGoal: '',
    selectedFoodSources: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [weightInput, setWeightInput] = useState('');
  const [heightInput, setHeightInput] = useState('');

  const handleInputChange = useCallback((name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleWeightChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setWeightInput(value);
        handleInputChange('weight', value);
      }
    },
    [handleInputChange]
  );

  const handleHeightChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setHeightInput(value);
        handleInputChange('height', value);
      }
    },
    [handleInputChange]
  );

  const weightInputRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const heightInputRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const handleSubmit = () => {
    // Convert avoidFoods string to array
    const updatedPreferences = {
      ...preferences,
      avoidFoods: preferences.avoidFoods.split(',').map(food => food.trim()).filter(food => food !== '')
    };
    onGenerateMealPlan(updatedPreferences);
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("teal.500", "teal.200");
  const headerBgColor = useColorModeValue("teal.500", "teal.600");
  const headerTextColor = "white";

  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  const QuestionCard = React.memo(({ icon, title, children }) => (
    <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md" position="relative">
      <Icon as={icon} position="absolute" top={4} right={4} boxSize={6} color={iconColor} />
      <Heading size="md" mb={4} pr={8}>{title}</Heading>
      {children}
    </Box>
  ));

  const questions = [
    {
      title: "Weight in Kg",
      icon: FaWeight,
      component: (
        <FormControl isRequired>
          <Input
            ref={weightInputRef}
            value={weightInput}
            onChange={handleWeightChange}
            placeholder="Enter weight"
            type="text"
          />
        </FormControl>
      )
    },
    {
      title: "Height in cm",
      icon: FaRulerVertical,
      component: (
        <FormControl isRequired>
          <Input
            ref={heightInputRef}
            value={heightInput}
            onChange={handleHeightChange}
            placeholder="Enter height"
            type="text"
          />
        </FormControl>
      )
    },
    {
      title: "Gender",
      icon: FaVenusMars,
      component: (
        <FormControl isRequired>
          <RadioGroup value={preferences.gender} onChange={(value) => handleInputChange('gender', value)}>
            <HStack spacing={4}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      )
    },
    {
      title: "Activity Level",
      icon: FaRunning,
      component: (
        <FormControl isRequired>
          <Select value={preferences.activityLevel} onChange={(e) => handleInputChange('activityLevel', e.target.value)} placeholder="Select activity level">
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extra Active</option>
          </Select>
        </FormControl>
      )
    },
    {
      title: "Exercise Frequency per Week",
      icon: FaDumbbell,
      component: (
        <FormControl isRequired>
          <Slider
            min={0}
            max={7}
            step={1}
            value={preferences.exerciseFrequency}
            onChange={(value) => handleInputChange('exerciseFrequency', value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} fontSize="sm" fontWeight="bold">
              {preferences.exerciseFrequency}
            </SliderThumb>
          </Slider>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">0</Text>
            <Text fontSize="sm">7</Text>
          </Flex>
        </FormControl>
      )
    },
    {
      title: "Dietary Restrictions",
      icon: FaAppleAlt,
      component: (
        <FormControl>
          <CheckboxGroup value={preferences.dietaryRestrictions} onChange={(values) => handleInputChange('dietaryRestrictions', values)}>
            <SimpleGrid columns={2} spacing={2}>
              <Checkbox value="vegetarian">Vegetarian</Checkbox>
              <Checkbox value="vegan">Vegan</Checkbox>
              <Checkbox value="gluten-free">Gluten-free</Checkbox>
              <Checkbox value="dairy-free">Dairy-free</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      )
    },
    {
      title: "Foods to Avoid",
      icon: FaUtensils,
      component: (
        <FormControl>
          <Input value={preferences.avoidFoods} onChange={(e) => handleInputChange('avoidFoods', e.target.value)} placeholder="e.g., nuts, shellfish" />
        </FormControl>
      )
    },
    {
      title: "Number of Meals per Day",
      icon: FaBalanceScale,
      component: (
        <FormControl isRequired>
          <Slider
            min={1}
            max={5}
            step={1}
            value={preferences.mealCount}
            onChange={(value) => handleInputChange('mealCount', value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} fontSize="sm" fontWeight="bold">
              {preferences.mealCount}
            </SliderThumb>
          </Slider>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">1</Text>
            <Text fontSize="sm">5</Text>
          </Flex>
        </FormControl>
      )
    },
    {
      title: "Cuisine Preferences",
      icon: FaUtensils,
      component: (
        <FormControl>
          <CheckboxGroup
            value={preferences.cuisinePreferences}
            onChange={(values) => handleInputChange('cuisinePreferences', values)}
          >
            <SimpleGrid columns={2} spacing={2}>
              <Checkbox value="mexican">Mexican</Checkbox>
              <Checkbox value="italian">Italian</Checkbox>
              <Checkbox value="asian">Asian</Checkbox>
              <Checkbox value="american">American</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      )
    },
    {
      title: "Fitness Goal",
      icon: FaDumbbell,
      component: (
        <FormControl>
          <RadioGroup value={preferences.fitnessGoal} onChange={(value) => handleInputChange('fitnessGoal', value)}>
            <VStack align="start">
              <Radio value="weight-loss">Weight Loss</Radio>
              <Radio value="muscle-gain">Muscle Gain</Radio>
              <Radio value="maintenance">Maintenance</Radio>
            </VStack>
          </RadioGroup>
        </FormControl>
      )
    },
    {
      title: "Macro Ratio",
      icon: FaBalanceScale,
      component: (
        <FormControl>
          <Select value={preferences.macroRatio} onChange={(e) => handleInputChange('macroRatio', e.target.value)}>
            <option value="">Select a ratio</option>
            <option value="balanced">Balanced (30/40/30)</option>
            <option value="high-protein">High Protein (40/40/20)</option>
            <option value="low-carb">Low Carb (30/50/20)</option>
          </Select>
        </FormControl>
      )
    },
    {
      title: "Food Source Preferences",
      icon: FaStore,
      component: (
        <FormControl>
          <CheckboxGroup
            value={preferences.selectedFoodSources}
            onChange={(values) => handleInputChange('selectedFoodSources', values)}
          >
            <SimpleGrid columns={2} spacing={2}>
              {foodSources.map((source) => (
                <Checkbox key={source} value={source}>
                  {source}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      )
    },
  ];

  const totalQuestions = questions.length;

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Box bg={headerBgColor} py={8} mb={8}>
        <Flex maxWidth="800px" mx="auto" px={4} direction="column" alignItems="center">
          <Heading size="2xl" color={headerTextColor} textAlign="center" mb={4}>
            Custom Meal Planner
          </Heading>
          <Text fontSize="xl" color={headerTextColor} textAlign="center" mb={6}>
            Craft Your Perfect Diet, Boost Your Health!
          </Text>
          <HStack spacing={4}>
            <Icon as={FaRocket} boxSize={8} color={headerTextColor} />
            <Icon as={FaAppleAlt} boxSize={8} color={headerTextColor} />
            <Icon as={FaDumbbell} boxSize={8} color={headerTextColor} />
          </HStack>
          <Box
            mt={6}
            p={3}
            bg="yellow.400"
            color="gray.800"
            fontWeight="bold"
            borderRadius="full"
            animation={`${pulseAnimation} 2s infinite`}
          >
            Get Started Now!
          </Box>
        </Flex>
      </Box>
      <Box maxWidth="500px" mx="auto" px={4} pb={8}>
        <VStack spacing={8} align="stretch">
          <Progress value={(currentQuestion + 1) / totalQuestions * 100} size="sm" colorScheme="teal" borderRadius="full" />

          <QuestionCard icon={questions[currentQuestion].icon} title={questions[currentQuestion].title}>
            {questions[currentQuestion].component}
          </QuestionCard>

          <HStack justifyContent="space-between">
            <Button onClick={prevQuestion} isDisabled={currentQuestion === 0} variant="outline" colorScheme="teal">
              Previous
            </Button>
            {currentQuestion === totalQuestions - 1 ? (
              <Button colorScheme="teal" onClick={handleSubmit}>
                Generate Meal Plan
              </Button>
            ) : (
              <Button onClick={nextQuestion} colorScheme="teal">
                Next
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Questionnaire;
