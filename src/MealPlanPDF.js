import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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
    borderBottom: '2 solid #2C3E50',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2980B9',
    borderBottom: '1 solid #BDC3C7',
    paddingBottom: 5,
  },
  mealContainer: {
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ECF0F1',
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#16A085',
  },
  foodItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#34495E',
  },
  macroSummary: {
    marginTop: 10,
    fontSize: 10,
    color: '#7F8C8D',
    fontWeight: 'bold',
  },
  dayTotals: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2C3E50',
    color: '#FFFFFF',
    borderRadius: 5,
  },
  dayTotalsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
    marginBottom: 10,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
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
            <Text style={styles.title}>Your Personalized Meal Plan</Text>
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
              Meal Totals: {meal.totalMacros.calories} kcal, 
              P: {meal.totalMacros.protein}g, 
              F: {meal.totalMacros.fat}g, 
              C: {meal.totalMacros.carbs}g
            </Text>
          </View>
        ))}
        <View style={styles.dayTotals}>
          <Text style={styles.dayTotalsTitle}>Day Totals</Text>
          <Text>
            Calories: {day.actualMacros.calories} kcal, 
            Protein: {day.actualMacros.protein}g, 
            Fat: {day.actualMacros.fat}g, 
            Carbs: {day.actualMacros.carbs}g
          </Text>
        </View>
        <View style={styles.footer}>
          <Text>© {new Date().getFullYear()} Your Company Name. All rights reserved.</Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MealPlanPDF;