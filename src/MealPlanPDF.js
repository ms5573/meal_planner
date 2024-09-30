import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Register custom fonts
Font.register({
  family: 'Lato',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/lato/v20/S6u9w4BMUTPHh6UVSwiPHA.ttf', fontWeight: 700 },
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Lato',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '2 solid #2C3E50',
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: 700,
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
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: '#16A085',
  },
  foodItem: {
    fontSize: 12,
    marginBottom: 5,
    color: '#34495E',
  },
  macroSummary: {
    marginTop: 10,
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: 700,
  },
  dayTotals: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2C3E50',
    color: '#FFFFFF',
    borderRadius: 5,
  },
  dayTotalsTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#BDC3C7',
    fontSize: 10,
    borderTop: '1 solid #BDC3C7',
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  snackContainer: {
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#E8F8F5',  // A lighter shade for snacks
  },
  snackTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: '#1ABC9C',  // A different color for snack titles
  },
  snackSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  snackSectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
    color: '#2980B9',
    borderBottom: '1 solid #BDC3C7',
    paddingBottom: 5,
  },
});

const logoMap = {
  "Subway": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/320px-Subway_2016_logo.svg.png",
  "Chipotle": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/320px-Chipotle_Mexican_Grill_logo.svg.png",
  "Just Salad": "https://upload.wikimedia.org/wikipedia/commons/c/cc/JS_Logo_Horizontal_RGB_Berry_%282%29.jpg",
  "Panera Bread": "https://upload.wikimedia.org/wikipedia/commons/4/49/Panera_Bread_wordmark.svg",
  "Cava": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Cava_logo.svg/320px-Cava_logo.svg.png",
  "Transparent Labs": "https://1000logos.net/wp-content/uploads/2020/09/Transparent-Labs-logo.png"
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
        
        {/* Regular Meals */}
        {day.meals.filter(meal => !meal.isSnack).map((meal, mealIndex) => (
          <View key={mealIndex} style={styles.mealContainer}>
            <View style={styles.logoContainer}>
              {logoMap[meal.source] && (
                <Image
                  src={logoMap[meal.source]}
                  style={styles.logo}
                />
              )}
              <Text style={styles.mealTitle}>Meal {mealIndex + 1} - {meal.source}</Text>
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
        
        {/* Snacks Section */}
        {day.meals.some(meal => meal.isSnack) && (
          <View style={styles.snackSection}>
            <Text style={styles.snackSectionTitle}>Snacks</Text>
            {day.meals.filter(meal => meal.isSnack).map((snack, snackIndex) => (
              <View key={snackIndex} style={styles.snackContainer}>
                <View style={styles.logoContainer}>
                  {logoMap[snack.source] && (
                    <Image
                      src={logoMap[snack.source]}
                      style={styles.logo}
                    />
                  )}
                  <Text style={styles.snackTitle}>Snack {snackIndex + 1} - {snack.source}</Text>
                </View>
                {snack.foods.map((food, foodIndex) => (
                  <Text key={foodIndex} style={styles.foodItem}>
                    • {food.name} ({food.servingSize}g)
                  </Text>
                ))}
                <Text style={styles.macroSummary}>
                  Snack Totals: {snack.totalMacros.calories} kcal, 
                  P: {snack.totalMacros.protein}g, 
                  F: {snack.totalMacros.fat}g, 
                  C: {snack.totalMacros.carbs}g
                </Text>
              </View>
            ))}
          </View>
        )}
        
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
