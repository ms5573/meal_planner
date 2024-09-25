import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  VStack, HStack, FormControl, Input, Select, Checkbox, CheckboxGroup,
  Radio, RadioGroup, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Box, SimpleGrid, useColorModeValue, Progress, Icon, Flex, Heading, keyframes, Text,
  FormErrorMessage,
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
    fitnessGoal: '',
    macroRatio: '',
    selectedFoodSources: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errors, setErrors] = useState({});

  const weightInputRef = useRef(null);
  const heightInputRef = useRef(null);

  const handleInputChange = useCallback((name, value) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const validateInput = useCallback((name, value) => {
    switch (name) {
      case 'weight':
      case 'height':
        return value && Number(value) > 0 ? '' : 'Please enter a valid number';
      case 'gender':
      case 'activityLevel':
      case 'fitnessGoal':
      case 'macroRatio':
        return value ? '' : 'Please select an option';
      case 'selectedFoodSources':
        return value.length > 0 ? '' : 'Please select at least one food source';
      default:
        return '';
    }
  }, []);

  const questions = useMemo(() => [
    {
      title: "Weight in Kg",
      icon: FaWeight,
      name: "weight",
      component: ({ error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <Input
            ref={weightInputRef}
            placeholder="Enter weight (kg)"
            type="number"
            min="20"
            max="300"
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Height in cm",
      icon: FaRulerVertical,
      name: "height",
      component: ({ error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <Input
            ref={heightInputRef}
            placeholder="Enter height (cm)"
            type="number"
            min="50"
            max="250"
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Gender",
      icon: FaVenusMars,
      name: "gender",
      component: ({ value, onChange, error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <RadioGroup value={value} onChange={onChange}>
            <HStack spacing={4}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </HStack>
          </RadioGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Activity Level",
      icon: FaRunning,
      name: "activityLevel",
      component: ({ value, onChange, error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <Select value={value} onChange={(e) => onChange(e.target.value)} placeholder="Select activity level">
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extra Active</option>
          </Select>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Exercise Frequency per Week",
      icon: FaDumbbell,
      name: "exerciseFrequency",
      component: ({ value, onChange }) => (
        <FormControl isRequired>
          <Slider min={0} max={7} step={1} value={value} onChange={onChange}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} fontSize="sm" fontWeight="bold">
              {value}
            </SliderThumb>
          </Slider>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">0</Text>
            <Text fontSize="sm">7</Text>
          </Flex>
        </FormControl>
      ),
    },
    {
      title: "Dietary Restrictions",
      icon: FaAppleAlt,
      name: "dietaryRestrictions",
      component: ({ value, onChange }) => (
        <FormControl>
          <CheckboxGroup value={value} onChange={onChange}>
            <SimpleGrid columns={2} spacing={2}>
              <Checkbox value="vegetarian">Vegetarian</Checkbox>
              <Checkbox value="vegan">Vegan</Checkbox>
              <Checkbox value="gluten-free">Gluten-free</Checkbox>
              <Checkbox value="dairy-free">Dairy-free</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      ),
    },
    {
      title: "Number of Meals per Day",
      icon: FaBalanceScale,
      name: "mealCount",
      component: ({ value, onChange }) => (
        <FormControl isRequired>
          <Slider min={1} max={5} step={1} value={value} onChange={onChange}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} fontSize="sm" fontWeight="bold">
              {value}
            </SliderThumb>
          </Slider>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">1</Text>
            <Text fontSize="sm">5</Text>
          </Flex>
        </FormControl>
      ),
    },
    {
      title: "Cuisine Preferences",
      icon: FaUtensils,
      name: "cuisinePreferences",
      component: ({ value, onChange }) => (
        <FormControl>
          <CheckboxGroup value={value} onChange={onChange}>
            <SimpleGrid columns={2} spacing={2}>
              <Checkbox value="mexican">Mexican</Checkbox>
              <Checkbox value="italian">Italian</Checkbox>
              <Checkbox value="asian">Asian</Checkbox>
              <Checkbox value="american">American</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      ),
    },
    {
      title: "Fitness Goal",
      icon: FaDumbbell,
      name: "fitnessGoal",
      component: ({ value, onChange, error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <RadioGroup value={value} onChange={onChange}>
            <VStack align="start">
              <Radio value="weight-loss">Weight Loss</Radio>
              <Radio value="muscle-gain">Muscle Gain</Radio>
              <Radio value="maintenance">Maintenance</Radio>
            </VStack>
          </RadioGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Macro Ratio",
      icon: FaBalanceScale,
      name: "macroRatio",
      component: ({ value, onChange, error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <Select value={value} onChange={(e) => onChange(e.target.value)} placeholder="Select a ratio">
            <option value="balanced">Balanced (30/40/30)</option>
            <option value="high-protein">High Protein (40/40/20)</option>
            <option value="low-carb">Low Carb (30/50/20)</option>
          </Select>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
    {
      title: "Food Source Preferences",
      icon: FaStore,
      name: "selectedFoodSources",
      component: ({ value, onChange, error }) => (
        <FormControl isRequired isInvalid={!!error}>
          <CheckboxGroup value={value} onChange={onChange}>
            <SimpleGrid columns={2} spacing={2}>
              {foodSources.map((source) => (
                <Checkbox key={source} value={source}>
                  {source}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      ),
    },
  ], [foodSources]);

  const handleSubmit = useCallback(() => {
    const updatedPreferences = { ...preferences };
    if (weightInputRef.current) updatedPreferences.weight = weightInputRef.current.value;
    if (heightInputRef.current) updatedPreferences.height = heightInputRef.current.value;

    const allErrors = {};
    Object.keys(updatedPreferences).forEach(key => {
      const error = validateInput(key, updatedPreferences[key]);
      if (error) allErrors[key] = error;
    });

    if (Object.keys(allErrors).length === 0) {
      onGenerateMealPlan(updatedPreferences);
    } else {
      setErrors(allErrors);
      const errorIndex = questions.findIndex(q => allErrors[q.name]);
      setCurrentQuestion(errorIndex !== -1 ? errorIndex : 0);
    }
  }, [preferences, validateInput, onGenerateMealPlan, questions]);

  const nextQuestion = useCallback(() => {
    const currentQuestionData = questions[currentQuestion];
    let currentValue = preferences[currentQuestionData.name];

    if (currentQuestionData.name === 'weight' && weightInputRef.current) {
      currentValue = weightInputRef.current.value;
    } else if (currentQuestionData.name === 'height' && heightInputRef.current) {
      currentValue = heightInputRef.current.value;
    }

    const error = validateInput(currentQuestionData.name, currentValue);

    if (!error && currentQuestion < questions.length - 1) {
      setPreferences(prev => ({ ...prev, [currentQuestionData.name]: currentValue }));
      setCurrentQuestion(prev => prev + 1);
    } else {
      setErrors(prev => ({ ...prev, [currentQuestionData.name]: error }));
    }
  }, [currentQuestion, preferences, validateInput, questions]);

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [currentQuestion]);

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
          <Progress value={(currentQuestion + 1) / questions.length * 100} size="sm" colorScheme="teal" borderRadius="full" />

          <QuestionCard icon={questions[currentQuestion].icon} title={questions[currentQuestion].title}>
            {questions[currentQuestion].component({
              value: preferences[questions[currentQuestion].name],
              onChange: (value) => handleInputChange(questions[currentQuestion].name, value),
              error: errors[questions[currentQuestion].name]
            })}
          </QuestionCard>

          <HStack justifyContent="space-between">
            <Button onClick={prevQuestion} isDisabled={currentQuestion === 0} variant="outline" colorScheme="teal">
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
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
