import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// You may need to adjust the path to your font file
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: { 
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
    fontFamily: 'Roboto',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2C7A7B',
  },
  dayTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#2C7A7B',
  },
  mealTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: '#2C7A7B',
  },
  food: {
    fontSize: 12,
    marginBottom: 3,
  },
  macros: {
    fontSize: 10,
    marginTop: 5,
    color: '#4A5568',
  },
  mealTotals: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
    color: '#2D3748',
  },
});

const ThirtyDayPlanPDF = ({ mealPlan }) => (
  <Document>
    {mealPlan.thirtyDayPlan.map((day, dayIndex) => (
      <Page size="A4" style={styles.page} key={dayIndex}>
        {dayIndex === 0 && <Text style={styles.title}>30-Day Meal Plan</Text>}
        <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>
        {day.meals.map((meal, mealIndex) => (
          <View key={mealIndex} style={styles.section}>
            <Text style={styles.mealTitle}>Meal {mealIndex + 1} - {meal.source}</Text>
            {meal.foods.map((food, foodIndex) => (
              <Text key={foodIndex} style={styles.food}>
                {food.name} - {food.servingSize}g
                (Calories: {food.calories}, Protein: {food.protein}g, Fat: {food.fat}g, Carbs: {food.carbs}g)
              </Text>
            ))}
            <Text style={styles.mealTotals}>
              Meal Totals - Calories: {meal.totalMacros.calories}, Protein: {meal.totalMacros.protein}g, 
              Fat: {meal.totalMacros.fat}g, Carbs: {meal.totalMacros.carbs}g
            </Text>
          </View>
        ))}
      </Page>
    ))}
  </Document>
);

export default ThirtyDayPlanPDF;