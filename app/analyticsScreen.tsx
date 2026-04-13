import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Modal, 
  StatusBar,
  TouchableWithoutFeedback 
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CHART_DATA = {
  Daily: {
    primary: [{ value: 40, label: 'Mon' }, { value: 95, label: 'Tue' }, { value: 85, label: 'Wed' }, { value: 110, label: 'Thu' }, { value: 150, label: 'Fri' }, { value: 130, label: 'Sat' }, { value: 120, label: 'Sun' }],
    secondary: [{ value: 30 }, { value: 60 }, { value: 70 }, { value: 90 }, { value: 110 }, { value: 100 }, { value: 90 }]
  },
  Weekly: {
    primary: [{ value: 200, label: 'W 1' }, { value: 450, label: 'W 2' }, { value: 300, label: 'W 3' }, { value: 500, label: 'W 4' }],
    secondary: [{ value: 150 }, { value: 300 }, { value: 250 }, { value: 400 }]
  },
  Monthly: {
    primary: [{ value: 80, label: 'Jan' }, { value: 120, label: 'Feb' }, { value: 90, label: 'Mar' }, { value: 150, label: 'Apr' }, { value: 510, label: 'May' }, { value: 140, label: 'Jun' }, { value: 140, label: 'Jul' }],
    secondary: [{ value: 50 }, { value: 50 }, { value: 100 }, { value: 60 }, { value: 120 }, { value: 80 }, { value: 80 }]
  },
  Annually: {
    primary: [{ value: 2000, label: '2023' }, { value: 4500, label: '2024' }, { value: 5100, label: '2025' }],
    secondary: [{ value: 1500 }, { value: 3800 }, { value: 4200 }]
  }
};

const AnalyticsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Annually'>('Monthly');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const currentData = useMemo(() => CHART_DATA[selectedFilter], [selectedFilter]);

  const StatCard = ({ title, value, icon, colors }: any) => (
    <View style={styles.card}>
      <LinearGradient colors={colors} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.iconContainer}>
        {icon}
      </LinearGradient>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.drName}>Dr. Rajendra</Text>
            <Text style={styles.speciality}>Cardiologist</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={styles.ratingText}>4.9 <Text style={styles.ratingCount}>(155 Reviews)</Text></Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartBox}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.sectionTitle}>Revenue Overview</Text>
              <View style={styles.legendRow}>
                <View style={[styles.dot, { backgroundColor: '#6366F1' }]} />
                <Text style={styles.legendText}>Current</Text>
                <View style={[styles.dot, { backgroundColor: '#E2E8F0', marginLeft: 12 }]} />
                <Text style={styles.legendText}>Previous</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.filterChip} onPress={() => setIsDropdownVisible(true)}>
              <Text style={styles.filterText}>{selectedFilter}</Text>
              <Ionicons name="chevron-down" size={14} color="#6366F1" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={currentData.primary}
              data2={currentData.secondary}
              height={180}
              width={selectedFilter === 'Daily' ? 500 : 380}
              initialSpacing={30}
              spacing={selectedFilter === 'Daily' ? 60 : 80}
              color1="#6366F1"
              color2="#E2E8F0"
              thickness1={4}
              thickness2={3}
              hideDataPoints={false}
              dataPointsColor1="#6366F1"
              curved
              areaChart
              startFillColor1="#6366F1"
              startOpacity={0.15}
              endOpacity={0.01}
              yAxisColor="transparent"
              xAxisColor="transparent"
              hideYAxisText
              xAxisLabelTextStyle={{ color: '#94A3B8', fontSize: 11, fontWeight: '600' }}
              pointerConfig={{
                pointerStripColor: '#6366F1',
                pointerColor: '#6366F1',
                radius: 5,
                pointerLabelComponent: (items: any) => (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>₹{items[0].value}</Text>
                  </View>
                ),
              }}
            />
          </ScrollView>
        </View>

        {/* Stats Grid */}
        <View style={styles.grid}>
          <StatCard title="Earnings" value="₹11,000" colors={['#EEF2FF', '#E0E7FF']}
            icon={<FontAwesome5 name="wallet" size={16} color="#6366F1" />} />
          <StatCard title="Consults" value="450" colors={['#ECFDF5', '#D1FAE5']}
            icon={<Ionicons name="videocam" size={18} color="#10B981" />} />
          <StatCard title="Packages" value="999" colors={['#FFF7ED', '#FFEDD5']}
            icon={<MaterialCommunityIcons name="shopping" size={18} color="#F59E0B" />} />
          <StatCard title="Profile Visits" value="867" colors={['#FDF2F8', '#FCE7F3']}
            icon={<Ionicons name="eye" size={18} color="#EC4899" />} />
        </View>
      </ScrollView>

      {/* Modal Selection */}
      <Modal visible={isDropdownVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.bottomSheet}>
              <View style={styles.handle} />
              <Text style={styles.modalTitle}>Select Period</Text>
              {['Daily', 'Weekly', 'Monthly', 'Annually'].map((opt: any) => (
                <TouchableOpacity 
                  key={opt} 
                  style={[styles.modalItem, selectedFilter === opt && styles.activeModalItem]}
                  onPress={() => { setSelectedFilter(opt); setIsDropdownVisible(false); }}
                >
                  <Text style={[styles.modalItemText, selectedFilter === opt && styles.activeModalText]}>{opt}</Text>
                  {selectedFilter === opt && <Ionicons name="checkmark-circle" size={20} color="#6366F1" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#FBFBFF' },
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 20 
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', letterSpacing: -0.5 },
  iconButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  profileSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 25 
  },
  avatar: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#E2E8F0' },
  profileInfo: { marginLeft: 16 },
  drName: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  speciality: { fontSize: 14, color: '#64748B', fontWeight: '500', marginBottom: 6 },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFBEB', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7'
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#92400E', marginLeft: 4 },
  ratingCount: { color: '#D97706', fontWeight: '400' },
  chartBox: { 
    backgroundColor: '#FFF', 
    marginHorizontal: 20, 
    borderRadius: 24, 
    padding: 20, 
    shadowColor: '#6366F1', 
    shadowOpacity: 0.06, 
    shadowRadius: 20, 
    elevation: 3,
    marginBottom: 25
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  legendText: { fontSize: 12, color: '#94A3B8', marginLeft: 6, fontWeight: '600' },
  filterChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#EEF2FF', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 10 
  },
  filterText: { fontSize: 13, fontWeight: '700', color: '#6366F1', marginRight: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  card: { 
    backgroundColor: '#FFF', 
    width: '47%', 
    padding: 16, 
    borderRadius: 20, 
    marginBottom: 16, 
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2
  },
  iconContainer: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 13, color: '#64748B', fontWeight: '600', marginBottom: 2 },
  cardValue: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  handle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 20, textAlign: 'center' },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, borderRadius: 16, marginBottom: 8 },
  activeModalItem: { backgroundColor: '#F5F3FF' },
  modalItemText: { fontSize: 16, fontWeight: '600', color: '#475569' },
  activeModalText: { color: '#6366F1' },
  tooltip: { backgroundColor: '#1E293B', padding: 8, borderRadius: 8 },
  tooltipText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});

export default AnalyticsScreen;