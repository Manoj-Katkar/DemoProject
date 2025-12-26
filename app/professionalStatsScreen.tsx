import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart, PieChart, LineChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

const ProfessionalStatsScreen = () => {
  
  // 1. SLOTS: Daily Bookings (Bar Chart)
  const slotData = [
    { value: 12, label: 'Mon', frontColor: '#4CAF50' },
    { value: 18, label: 'Tue', frontColor: '#4CAF50' },
    { value: 10, label: 'Wed', frontColor: '#4CAF50' },
    { value: 22, label: 'Thu', frontColor: '#4CAF50' },
    { value: 30, label: 'Fri', frontColor: '#2E7D32' }, // Highlight Peak
  ];

  // 2. PACKAGES: Sales Distribution (Pie Chart)
  const packageData = [
    { value: 35, text: '35%', color: '#FF9800', label: 'Basic' },
    { value: 25, text: '25%', color: '#2196F3', label: 'Standard' },
    { value: 40, text: '40%', color: '#9C27B0', label: 'Premium', focused: true },
  ];

  // 3. LOCATION: Top Cities (Horizontal Bar Chart)
  const locationData = [
    { value: 45, label: 'NY', frontColor: '#3F51B5' },
    { value: 30, label: 'LA', frontColor: '#3F51B5' },
    { value: 25, label: 'CH', frontColor: '#3F51B5' },
    { value: 20, label: 'TX', frontColor: '#3F51B5' },
  ];

  // 4. AGE GROUPS: User Demographics (Bar Chart)
  const ageData = [
    { value: 15, label: '18-24', frontColor: '#00BCD4' },
    { value: 40, label: '25-34', frontColor: '#0097A7' },
    { value: 30, label: '35-44', frontColor: '#00BCD4' },
    { value: 15, label: '45+', frontColor: '#00BCD4' },
  ];

  // 5. GENDER: Split (Donut Chart)
  const genderData = [
    { value: 55, color: '#E91E63', text: '55%' }, // Female
    { value: 40, color: '#03A9F4', text: '40%' }, // Male
    { value: 5, color: '#9E9E9E', text: '5%' },   // Other
  ];

  // 6. TIME: Peak Activity / Earnings over Time (Line Chart)
  const timeData = [
    { value: 2000, label: '08:00' },
    { value: 4500, label: '12:00' },
    { value: 3000, label: '16:00' },
    { value: 8200, label: '20:00' },
    { value: 6000, label: '00:00' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Professional Insights</Text>

      {/* Slots Section */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>📅 Daily Slot Bookings</Text>
        <BarChart
          data={slotData}
          barWidth={35}
          noOfSections={3}
          barBorderRadius={6}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
        />
      </View>

      {/* Packages Section */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>📦 Package Popularity</Text>
        <View style={styles.centerAlign}>
            <PieChart
                data={packageData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#fff'}
                centerLabelComponent={() => (
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Sales</Text>
                )}
            />
        </View>
      </View>

      {/* Time & Earnings Section */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>🕒 Peak Activity Time</Text>
        <LineChart
          data={timeData}
          color="#E91E63"
          thickness={3}
          curved
          hideDataPoints={false}
          dataPointsColor="#E91E63"
          areaChart
          startFillColor="rgba(233, 30, 99, 0.3)"
          endFillColor="rgba(233, 30, 99, 0.01)"
        />
      </View>

      {/* Demographics (Age & Gender) */}
      <View style={styles.row}>
        <View style={[styles.chartCard, {flex: 1, marginRight: 8}]}>
            <Text style={styles.smallTitle}>👥 Gender</Text>
            <PieChart
                data={genderData}
                radius={50}
                innerRadius={30}
                showText
                textColor="white"
                textSize={10}
            />
        </View>
        <View style={[styles.chartCard, {flex: 1.5}]}>
            <Text style={styles.smallTitle}>🎂 Age Group</Text>
            <BarChart
                data={ageData}
                barWidth={15}
                height={100}
                noOfSections={2}
                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.chartCard}>
        <Text style={styles.title}>📍 Top Locations</Text>
        <BarChart
          horizontal
          data={locationData}
          barWidth={20}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
        />
      </View>

      <View style={{height: 50}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 16 , marginTop: 30},
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: '#1A237E' },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 15, color: '#333' },
  smallTitle: { fontSize: 14, fontWeight: "600", marginBottom: 10, color: '#333' },
  centerAlign: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default ProfessionalStatsScreen;