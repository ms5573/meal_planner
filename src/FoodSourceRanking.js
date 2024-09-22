import React, { useState } from 'react';
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import FoodSourceRanking from './FoodSourceRanking';

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
    proteinPreferences: [],
    fitnessGoal: '',
    macroRatio: '',
    weightGoal: '',
    sourceRanking: foodSources,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleNumberInputChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleCheckboxChange = (name, values) => {
    setPreferences({ ...preferences, [name]: values });
  };

  const handleSubmit = () => {
    onGenerateMealPlan(preferences);
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");

  const FormSection = ({ title, children }) => (
    <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>{title}</Heading>
      {children}
    </Box>
  );

  return (
    <Box bg={bgColor} p={8} borderRadius="lg">
      <VStack spacing={8} align="stretch">
        <Heading size="xl" textAlign="center" color="teal.500">
          Personalize Your Meal Plan
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FormSection title="Basic Information">
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Weight (kg)</FormLabel>
                <NumberInput min={0} onChange={(value) => handleNumberInputChange('weight', value)}>
                  <NumberInputField name="weight" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Height (cm)</FormLabel>
                <NumberInput min={0} onChange={(value) => handleNumberInputChange('height', value)}>
                  <NumberInputField name="height" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </SimpleGrid>
            <FormControl isRequired mt={4}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup onChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
                <HStack spacing={4}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </FormSection>

          <FormSection title="Activity Level">
            <FormControl isRequired>
              <FormLabel>Activity Level</FormLabel>
              <Select name="activityLevel" onChange={handleInputChange} placeholder="Select activity level">
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly Active</option>
                <option value="1.55">Moderately Active</option>
                <option value="1.725">Very Active</option>
                <option value="1.9">Extra Active</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Exercise Frequency (days per week): {preferences.exerciseFrequency}</FormLabel>
              <Slider
                min={0}
                max={7}
                step={1}
                value={preferences.exerciseFrequency}
                onChange={(value) => handleSliderChange('exerciseFrequency', value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
          </FormSection>

          <FormSection title="Dietary Preferences">
            <FormControl>
              <FormLabel>Dietary Restrictions</FormLabel>
              <CheckboxGroup onChange={(values) => handleCheckboxChange('dietaryRestrictions', values)}>
                <SimpleGrid columns={2} spacing={2}>
                  <Checkbox value="vegetarian">Vegetarian</Checkbox>
                  <Checkbox value="vegan">Vegan</Checkbox>
                  <Checkbox value="gluten-free">Gluten-free</Checkbox>
                  <Checkbox value="dairy-free">Dairy-free</Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Foods to Avoid</FormLabel>
              <Input name="avoidFoods" onChange={handleInputChange} placeholder="e.g., nuts, shellfish" />
            </FormControl>
          </FormSection>

          <FormSection title="Meal Preferences">
            <FormControl isRequired>
              <FormLabel>Number of Meals per Day: {preferences.mealCount}</FormLabel>
              <Slider
                min={1}
                max={5}
                step={1}
                value={preferences.mealCount}
                onChange={(value) => handleSliderChange('mealCount', value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cuisine Preferences</FormLabel>
              <CheckboxGroup onChange={(values) => handleCheckboxChange('cuisinePreferences', values)}>
                <SimpleGrid columns={2} spacing={2}>
                  <Checkbox value="mexican">Mexican</Checkbox>
                  <Checkbox value="italian">Italian</Checkbox>
                  <Checkbox value="asian">Asian</Checkbox>
                  <Checkbox value="american">American</Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>
          </FormSection>
        </SimpleGrid>

        <FormSection title="Nutrition Goals">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Fitness Goal</FormLabel>
              <RadioGroup onChange={(value) => handleInputChange({ target: { name: 'fitnessGoal', value } })}>
                <VStack align="start">
                  <Radio value="weight-loss">Weight Loss</Radio>
                  <Radio value="muscle-gain">Muscle Gain</Radio>
                  <Radio value="maintenance">Maintenance</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Preferred Macro Ratio</FormLabel>
              <Select name="macroRatio" onChange={handleInputChange}>
                <option value="">Select a ratio</option>
                <option value="balanced">Balanced (30/40/30)</option>
                <option value="high-protein">High Protein (40/40/20)</option>
                <option value="low-carb">Low Carb (30/50/20)</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <FormControl mt={4}>
            <FormLabel>Weight Goal (in kg)</FormLabel>
            <NumberInput onChange={(value) => handleNumberInputChange('weightGoal', value)}>
              <NumberInputField name="weightGoal" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </FormSection>

        <FormSection title="Food Source Preferences">
          <Text mb={2}>Drag to reorder your preferred food sources:</Text>
          <FoodSourceRanking preferences={preferences} setPreferences={setPreferences} />
        </FormSection>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSubmit}
          w="full"
          mt={4}
        >
          Generate Meal Plan
        </Button>
      </VStack>
    </Box>
  );
};

export default Questionnaire;