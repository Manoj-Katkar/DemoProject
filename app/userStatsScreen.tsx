import React from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

const UserStatsScreen = () => {
  // 1. CATEGORIES: Pie Chart
  const bookingCategory = [
    { value: 30, text: '30%', color: "#3F51B5", label: 'Hair' },
    { value: 20, text: '20%', color: "#009688", label: 'Spa' },
    { value: 25, text: '25%', color: "#FFC107", label: 'Massage' },
    { value: 25, text: '25%', color: "#F44336", label: 'Nails' },
  ];

  // 2. PREFERRED TIME: Bar Chart with Gradients
  const timeData = [
    { value: 20, label: "Morning", frontColor: "#D1C4E9" },
    { value: 35, label: "Afternoon", frontColor: "#9575CD" },
    { value: 45, label: "Evening", frontColor: "#673AB7" }, // Peak color
  ];

  // 3. USAGE TREND: Smooth Line Chart
  const usageTrend = [
    { value: 2, label: 'Wk 1' },
    { value: 5, label: 'Wk 2' },
    { value: 7, label: 'Wk 3' },
    { value: 10, label: 'Wk 4' },
    { value: 13, label: 'Wk 5' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>User Insights</Text>

      {/* Booking Categories */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>🎯 Bookings by Category</Text>
        <View style={styles.centerAlign}>
          <PieChart
            data={bookingCategory}
            donut
            radius={90}
            innerRadius={60}
            showText
            textColor="#fff"
            textSize={12}
            fontWeight="bold"
            centerLabelComponent={() => (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>100</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>Total</Text>
              </View>
            )}
          />
        </View>
        {/* Simple Legend */}
        <View style={styles.legendContainer}>
          {bookingCategory.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Preferred Booking Time */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>⏰ Preferred Booking Time</Text>
        <BarChart
          data={timeData}
          barWidth={60}
          noOfSections={3}
          barBorderRadius={8}
          isAnimated
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          maxValue={50}
        />
      </View>

      {/* Usage Trend */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>📈 App Usage Trend</Text>
        <LineChart
          data={usageTrend}
          color="#00BCD4"
          thickness={4}
          curved
          isAnimated
          areaChart
          startFillColor="rgba(0, 188, 212, 0.4)"
          endFillColor="rgba(0, 188, 212, 0.01)"
          startOpacity={0.4}
          endOpacity={0.1}
          noOfSections={3}
          yAxisThickness={0}
          xAxisThickness={0}
          dataPointsColor="#00838F"
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 , marginTop: 30 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: '#2C3E50' },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 20, color: '#34495E' },
  centerAlign: { alignItems: 'center', justifyContent: 'center' },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 5 },
  legendText: { fontSize: 12, color: '#7F8C8D' },
});

export default UserStatsScreen;