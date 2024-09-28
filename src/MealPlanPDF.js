import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2980B9',
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#16A085',
  },
  foodItem: {
    fontSize: 12,
    marginBottom: 3,
  },
  macroSummary: {
    marginTop: 10,
    fontSize: 12,
    color: '#7F8C8D',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#BDC3C7',
    fontSize: 10,
  },
});

const MealPlanPDF = ({ mealPlan, targetMacros }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Personalized Meal Plan</Text>
        <Text style={styles.subtitle}>Generated on {format(new Date(), 'MMMM d, yyyy')}</Text>
      </View>
      
      {mealPlan.map((day, dayIndex) => (
        <View key={dayIndex} style={styles.section}>
          <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>
          {day.meals.map((meal, mealIndex) => (
            <View key={mealIndex} style={{ marginBottom: 10 }}>
              <Text style={styles.mealTitle}>Meal {mealIndex + 1} - {meal.source}</Text>
              {meal.foods.map((food, foodIndex) => (
                <Text key={foodIndex} style={styles.foodItem}>
                  • {food.name} ({food.servingSize}g)
                </Text>
              ))}
              <Text style={styles.macroSummary}>
                Meal Totals: {meal.totalMacros.calories} kcal, 
                P: {meal.totalMacros.protein}g, 
                F: {meal.totalMacros.fat}g, 
                C: {meal.totalMacros.carbs}g
              </Text>
            </View>
          ))}
          <Text style={styles.macroSummary}>
            Day Totals: {day.actualMacros.calories} kcal, 
            P: {day.actualMacros.protein}g, 
            F: {day.actualMacros.fat}g, 
            C: {day.actualMacros.carbs}g
          </Text>
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text>© {new Date().getFullYear()} Your Company Name. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

export default MealPlanPDF;