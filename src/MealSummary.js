import React from 'react';
import { Box, SimpleGrid, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaFire, FaDrumstickBite, FaCheese, FaBreadSlice } from 'react-icons/fa';

const MacroIcon = ({ type, color }) => {
  switch (type) {
    case 'calories': return <FaFire color={color} />;
    case 'protein': return <FaDrumstickBite color={color} />;
    case 'fat': return <FaCheese color={color} />;
    case 'carbs': return <FaBreadSlice color={color} />;
    default: return null;
  }
};

const MealSummary = ({ totalMacros }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const iconColors = useColorModeValue(
    { calories: "red.500", protein: "green.500", fat: "yellow.500", carbs: "purple.500" },
    { calories: "red.300", protein: "green.300", fat: "yellow.300", carbs: "purple.300" }
  );

  return (
    <Box mt={4} p={3} bg={bgColor} borderRadius="md">
      <Text fontWeight="bold" mb={2} color={textColor}>Meal Totals:</Text>
      <SimpleGrid columns={2} spacing={3}>
        <HStack>
          <MacroIcon type="calories" color={iconColors.calories} />
          <Text fontSize="sm" color={textColor}>{totalMacros.calories} kcal</Text>
        </HStack>
        <HStack>
          <MacroIcon type="protein" color={iconColors.protein} />
          <Text fontSize="sm" color={textColor}>{totalMacros.protein}g protein</Text>
        </HStack>
        <HStack>
          <MacroIcon type="fat" color={iconColors.fat} />
          <Text fontSize="sm" color={textColor}>{totalMacros.fat}g fat</Text>
        </HStack>
        <HStack>
          <MacroIcon type="carbs" color={iconColors.carbs} />
          <Text fontSize="sm" color={textColor}>{totalMacros.carbs}g carbs</Text>
        </HStack>
      </SimpleGrid>
    </Box>
  );
};

export default MealSummary;