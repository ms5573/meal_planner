import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Utility function to round numbers to one decimal place
const roundToOneDecimal = (num) => {
  return Number(num.toFixed(1));
};

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '1 solid #2C3E50',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 10,
    color: '#7F8C8D',
    marginTop: 5,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2980B9',
    borderBottom: '1 solid #BDC3C7',
    paddingBottom: 5,
  },
  mealContainer: {
    marginBottom: 15,
    borderRadius: 3,
    padding: 8,
    backgroundColor: '#ECF0F1',
  },
  mealTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#16A085',
  },
  foodItem: {
    fontSize: 9,
    marginBottom: 3,
    color: '#34495E',
  },
  macroSummary: {
    marginTop: 8,
    fontSize: 9,
    color: '#7F8C8D',
    fontWeight: 'bold',
  },
  dayTotals: {
    marginTop: 15,
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 3,
    borderLeft: '3 solid #2C3E50',
  },
  dayTotalsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#2C3E50',
  },
  dayTotalsContent: {
    fontSize: 9,
    color: '#34495E',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#BDC3C7',
    fontSize: 8,
    borderTop: '1 solid #BDC3C7',
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
});

const logoMap = {
  "Subway": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/320px-Subway_2016_logo.svg.png",
  "Chipotle": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/320px-Chipotle_Mexican_Grill_logo.svg.png",
  "Just Salad": "https://upload.wikimedia.org/wikipedia/commons/c/cc/JS_Logo_Horizontal_RGB_Berry_%282%29.jpg",
  "Panera Bread": "https://upload.wikimedia.org/wikipedia/commons/4/49/Panera_Bread_wordmark.svg",
  "Cava": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Cava_logo.svg/320px-Cava_logo.svg.png",
};

const MealPlanPDF = ({ mealPlan, targetMacros }) => (
  <Document>
    {mealPlan.map((day, dayIndex) => (
      <Page key={dayIndex} size="A4" style={styles.page}>
        {dayIndex === 0 && (
          <View style={styles.header}>
            <Text style={styles.title}>Your FuelMate Meal Plan</Text>
            <Text style={styles.subtitle}>Generated on {format(new Date(), 'MMMM d, yyyy')}</Text>
          </View>
        )}
        <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>
        {day.meals.map((meal, mealIndex) => (
          <View key={mealIndex} style={styles.mealContainer}>
            <View style={styles.logoContainer}>
              {logoMap[meal.source] && (
                <Image
                  src={logoMap[meal.source]}
                  style={styles.logo}
                />
              )}
              <Text style={styles.mealTitle}>
                {meal.isSnack ? "Snack" : `Meal ${mealIndex + 1}`} - {meal.source}
              </Text>
            </View>
            {meal.foods.map((food, foodIndex) => (
              <Text key={foodIndex} style={styles.foodItem}>
                • {food.name} ({food.servingSize}g)
              </Text>
            ))}
            <Text style={styles.macroSummary}>
              Meal Totals: {roundToOneDecimal(meal.totalMacros.calories)} kcal, 
              P: {roundToOneDecimal(meal.totalMacros.protein)}g, 
              F: {roundToOneDecimal(meal.totalMacros.fat)}g, 
              C: {roundToOneDecimal(meal.totalMacros.carbs)}g
            </Text>
          </View>
        ))}
        <View style={styles.dayTotals}>
          <Text style={styles.dayTotalsTitle}>Day Totals</Text>
          <Text style={styles.dayTotalsContent}>
            Calories: {roundToOneDecimal(day.actualMacros.calories)} kcal | 
            Protein: {roundToOneDecimal(day.actualMacros.protein)}g | 
            Fat: {roundToOneDecimal(day.actualMacros.fat)}g | 
            Carbs: {roundToOneDecimal(day.actualMacros.carbs)}g
          </Text>
        </View>
        <View style={styles.footer}>
          <Text>© {new Date().getFullYear()} FuelMate. All rights reserved.</Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MealPlanPDF;
