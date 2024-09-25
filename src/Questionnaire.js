import React, { useState, useCallback, useMemo } from 'react';
import {
  VStack, HStack, FormControl, FormLabel, Input, Select, Checkbox, CheckboxGroup,
  Radio, RadioGroup, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Box, SimpleGrid, useColorModeValue, Progress, Icon, Flex, Heading, Text,
  FormErrorMessage, Container, Divider, Tooltip, VisuallyHidden,
} from "@chakra-ui/react";
import {
  FaWeight, FaRulerVertical, FaVenusMars, FaRunning, FaAppleAlt, FaUtensils,
  FaDumbbell, FaBalanceScale, FaStore, FaRocket, FaUser, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';

const Questionnaire = ({ onGenerateMealPlan, foodSources }) => {
  const [preferences, setPreferences] = useState({
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    exerciseFrequency: 3,
    mealCount: 3,
    dietaryRestrictions: [],
    cuisinePreferences: [],
    fitnessGoal: '',
    macroRatio: '',
    selectedFoodSources: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

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

  const steps = useMemo(() => [
    {
      title: "Personal Information",
      icon: FaUser,
      fields: [
        {
          name: "weight",
          label: "Weight (kg)",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Weight (kg)</FormLabel>
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter weight"
                type="number"
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          ),
        },
        {
          name: "height",
          label: "Height (cm)",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter height"
                type="number"
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          ),
        },
        {
          name: "gender",
          label: "Gender",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Gender</FormLabel>
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
      ],
    },
    {
      title: "Activity & Exercise",
      icon: FaRunning,
      fields: [
        {
          name: "activityLevel",
          label: "Activity Level",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Activity Level</FormLabel>
              <Select value={value} onChange={(e) => onChange(e.target.value)} placeholder="Select activity level">
                <option value="1.2">Sedentary (Little or no exercise)</option>
                <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra Active (Very hard exercise & physical job)</option>
              </Select>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          ),
        },
        {
          name: "exerciseFrequency",
          label: "Exercise Frequency per Week",
          component: ({ value, onChange }) => (
            <FormControl isRequired>
              <FormLabel>Exercise Frequency per Week</FormLabel>
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
      ],
    },
    {
      title: "Dietary Preferences",
      icon: FaAppleAlt,
      fields: [
        {
          name: "dietaryRestrictions",
          label: "Dietary Restrictions",
          component: ({ value, onChange }) => (
            <FormControl>
              <FormLabel>Dietary Restrictions</FormLabel>
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
          name: "cuisinePreferences",
          label: "Cuisine Preferences",
          component: ({ value, onChange }) => (
            <FormControl>
              <FormLabel>Cuisine Preferences</FormLabel>
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
      ],
    },
    {
      title: "Meal Planning",
      icon: FaUtensils,
      fields: [
        {
          name: "mealCount",
          label: "Number of Meals per Day",
          component: ({ value, onChange }) => (
            <FormControl isRequired>
              <FormLabel>Number of Meals per Day</FormLabel>
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
          name: "selectedFoodSources",
          label: "Food Source Preferences",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Food Source Preferences</FormLabel>
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
      ],
    },
    {
      title: "Fitness Goals",
      icon: FaDumbbell,
      fields: [
        {
          name: "fitnessGoal",
          label: "Fitness Goal",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Fitness Goal</FormLabel>
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
          name: "macroRatio",
          label: "Macro Ratio",
          component: ({ value, onChange, error }) => (
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Macro Ratio</FormLabel>
              <Tooltip label="Choose a macro ratio based on your goals. For example, high protein is ideal for muscle gain." hasArrow>
                <Select value={value} onChange={(e) => onChange(e.target.value)} placeholder="Select a ratio">
                  <option value="balanced">Balanced (30% Protein, 40% Carbs, 30% Fat)</option>
                  <option value="high-protein">High Protein (40% Protein, 40% Carbs, 20% Fat)</option>
                  <option value="low-carb">Low Carb (30% Protein, 50% Fat, 20% Carbs)</option>
                </Select>
              </Tooltip>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          ),
        },
      ],
    },
  ], [foodSources]);

  const handleSubmit = useCallback(() => {
    const allErrors = {};
    Object.keys(preferences).forEach(key => {
      const error = validateInput(key, preferences[key]);
      if (error) allErrors[key] = error;
    });

    if (Object.keys(allErrors).length === 0) {
      onGenerateMealPlan(preferences);
    } else {
      setErrors(allErrors);
      const errorStep = steps.findIndex(step => 
        step.fields.some(field => allErrors[field.name])
      );
      setCurrentStep(errorStep !== -1 ? errorStep : 0);
    }
  }, [preferences, validateInput, onGenerateMealPlan, steps]);

  const nextStep = useCallback(() => {
    const currentStepData = steps[currentStep];
    const stepErrors = {};
    currentStepData.fields.forEach(field => {
      const error = validateInput(field.name, preferences[field.name]);
      if (error) stepErrors[field.name] = error;
    });

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      setErrors(stepErrors);
    }
  }, [currentStep, preferences, validateInput, steps]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("teal.500", "teal.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Progress value={(currentStep + 1) / steps.length * 100} size="sm" colorScheme="teal" borderRadius="full" />

          <Box
            bg={cardBgColor}
            p={8}
            borderRadius="lg"
            boxShadow="xl"
            borderWidth={1}
            borderColor={borderColor}
          >
            <VStack spacing={6} align="stretch">
              <HStack spacing={4} align="center">
                <Icon as={steps[currentStep].icon} boxSize={8} color={iconColor} />
                <Heading size="lg">{steps[currentStep].title}</Heading>
              </HStack>

              <Divider />

              <VStack spacing={6} align="stretch">
                {steps[currentStep].fields.map((field) => (
                  <Box key={field.name}>
                    {field.component({
                      value: preferences[field.name],
                      onChange: (value) => handleInputChange(field.name, value),
                      error: errors[field.name]
                    })}
                  </Box>
                ))}
              </VStack>

              <HStack justifyContent="space-between" pt={4}>
                <Button onClick={prevStep} isDisabled={currentStep === 0} variant="outline" colorScheme="teal">
                  Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button colorScheme="teal" onClick={handleSubmit}>
                    Generate Meal Plan
                  </Button>
                ) : (
                  <Button onClick={nextStep} colorScheme="teal">
                    Next
                  </Button>
                )}
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Questionnaire;
