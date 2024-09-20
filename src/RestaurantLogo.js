import React, { useState } from 'react';
import { Image, Box, Text } from "@chakra-ui/react";

const RestaurantLogo = ({ source }) => {
  const [imageError, setImageError] = useState(false);

  const logoMap = {
    "Subway": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/320px-Subway_2016_logo.svg.png",
    "Chipotle": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/320px-Chipotle_Mexican_Grill_logo.svg.png",
    "Just Salad": "https://upload.wikimedia.org/wikipedia/commons/c/cc/JS_Logo_Horizontal_RGB_Berry_%282%29.jpg",
    "Panera Bread": "https://upload.wikimedia.org/wikipedia/commons/4/49/Panera_Bread_wordmark.svg",
    "Cava": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Cava_logo.svg/320px-Cava_logo.svg.png"
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!imageError && logoMap[source]) {
    return (
      <Box width="50px" height="50px" display="flex" alignItems="center" justifyContent="center">
        <Image
          src={logoMap[source]}
          alt={`${source} logo`}
          maxWidth="100%"
          maxHeight="100%"
          objectFit="contain"
          onError={handleImageError}
        />
      </Box>
    );
  } else {
    return (
      <Box 
        width="50px" 
        height="50px" 
        borderRadius="50%" 
        bg="gray.200" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        fontWeight="bold"
        fontSize="xl"
        color="gray.600"
      >
        <Text>{getInitials(source)}</Text>
      </Box>
    );
  }
};

export default RestaurantLogo;