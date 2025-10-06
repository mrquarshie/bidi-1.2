import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabTwoScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const accentColor = useThemeColor({}, 'accent');
  const successColor = useThemeColor({}, 'success');
  const warningColor = useThemeColor({}, 'warning');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: primaryColor, dark: darkGreen }}
      headerImage={
        <View style={styles.headerContent}>
          <IconSymbol
            size={120}
            color="#ffffff"
            name="chart.bar.fill"
            style={styles.headerIcon}
          />
          <View style={styles.fuelElements}>
            <IconSymbol name="fuelpump.fill" size={24} color="rgba(255,255,255,0.3)" style={styles.fuelElement1} />
            <IconSymbol name="drop.fill" size={20} color="rgba(255,255,255,0.4)" style={styles.fuelElement2} />
            <IconSymbol name="fuelpump.fill" size={18} color="rgba(255,255,255,0.2)" style={styles.fuelElement3} />
            <IconSymbol name="drop.fill" size={22} color="rgba(255,255,255,0.3)" style={styles.fuelElement4} />
          </View>
          <View style={styles.headerGradient} />
        </View>
      }>
      
      {/* Dashboard Header */}
      <Card variant="elevated" style={styles.headerCard}>
        <View style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={[styles.dashboardTitle, { fontFamily: Fonts.rounded }]}>
            Fuel Station Dashboard
          </ThemedText>
        </View>
        <ThemedText style={styles.welcomeText}>
          Welcome to the BiDi Fuel Station Management System. Monitor and manage your station operations efficiently.
        </ThemedText>
      </Card>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card variant="elevated" style={styles.statCard}>
          <View style={styles.statIcon}>
            <IconSymbol name="fuelpump.fill" size={24} color={successColor} />
          </View>
          <ThemedText type="heading" style={styles.statValue}>24</ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>Tokens Today</ThemedText>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <View style={styles.statIcon}>
            <IconSymbol name="drop.fill" size={24} color={accentColor} />
          </View>
          <ThemedText type="heading" style={styles.statValue}>GHC 1,250</ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>Revenue</ThemedText>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <View style={styles.statIcon}>
            <IconSymbol name="fuelpump.fill" size={24} color={primaryColor} />
          </View>
          <ThemedText type="heading" style={styles.statValue}>85L</ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>Fuel Dispensed</ThemedText>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <View style={styles.statIcon}>
            <IconSymbol name="drop.fill" size={24} color={warningColor} />
          </View>
          <ThemedText type="heading" style={styles.statValue}>12</ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>Pending</ThemedText>
        </Card>
      </View>

      {/* Management Sections */}
      <Card variant="outlined" style={styles.managementCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Token Management
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Validate fuel tokens and process fuel dispensing transactions. Enter token codes to verify customer purchases.
        </ThemedText>
        <View style={styles.demoInfo}>
          <View style={styles.demoItem}>
            <IconSymbol name="key.fill" size={16} color={primaryColor} />
            <ThemedText style={styles.demoText}>
              <ThemedText type="label">Demo Token:</ThemedText> TOKEN123
            </ThemedText>
          </View>
          <View style={styles.demoItem}>
            <IconSymbol name="building.2.fill" size={16} color={primaryColor} />
            <ThemedText style={styles.demoText}>
              <ThemedText type="label">Demo Station:</ThemedText> ST001
            </ThemedText>
          </View>
        </View>
        <Button
          title="Validate Token"
          onPress={() => alert('Token validation pressed')}
          variant="primary"
          size="md"
          style={styles.actionButton}
          icon={<IconSymbol name="checkmark.seal.fill" size={16} color="#ffffff" />}
        />
      </Card>

      <Card variant="outlined" style={styles.managementCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Manual Sales
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Process direct fuel sales without tokens. Enter customer phone numbers and fuel amounts for immediate transactions.
        </ThemedText>
        <View style={styles.pricingInfo}>
          <View style={styles.priceItem}>
            <IconSymbol name="fuelpump.fill" size={16} color={accentColor} />
            <ThemedText style={styles.priceText}>Petrol: GHC 15.50/L</ThemedText>
          </View>
          <View style={styles.priceItem}>
            <IconSymbol name="fuelpump.fill" size={16} color={accentColor} />
            <ThemedText style={styles.priceText}>Diesel: GHC 14.20/L</ThemedText>
          </View>
        </View>
        <Button
          title="Process Sale"
          onPress={() => alert('Manual sale pressed')}
          variant="outline"
          size="md"
          style={styles.actionButton}
          icon={<IconSymbol name="creditcard.fill" size={16} color={primaryColor} />}
        />
      </Card>

      <Card variant="outlined" style={styles.managementCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Transaction History
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          View all completed transactions with filtering options by date and product type. Track daily sales and customer interactions.
        </ThemedText>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <IconSymbol name="calendar" size={16} color={primaryColor} />
            <ThemedText style={styles.featureText}>Date filtering</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="slider.horizontal.3" size={16} color={primaryColor} />
            <ThemedText style={styles.featureText}>Product filtering</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="square.and.arrow.up" size={16} color={primaryColor} />
            <ThemedText style={styles.featureText}>Export capabilities</ThemedText>
          </View>
        </View>
        <Button
          title="View History"
          onPress={() => alert('Transaction history pressed')}
          variant="secondary"
          size="md"
          style={styles.actionButton}
          icon={<IconSymbol name="clock.arrow.circlepath" size={16} color={primaryColor} />}
        />
      </Card>

      <Card variant="outlined" style={styles.managementCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Reports & Analytics
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Generate comprehensive reports on fuel sales, transaction volumes, and revenue. Export data for accounting and analysis purposes.
        </ThemedText>
        <View style={styles.metricsList}>
          <View style={styles.metricItem}>
            <IconSymbol name="chart.bar.fill" size={16} color={successColor} />
            <ThemedText style={styles.metricText}>Total liters dispensed</ThemedText>
          </View>
          <View style={styles.metricItem}>
            <IconSymbol name="dollarsign.circle.fill" size={16} color={successColor} />
            <ThemedText style={styles.metricText}>Revenue tracking</ThemedText>
          </View>
          <View style={styles.metricItem}>
            <IconSymbol name="number.circle.fill" size={16} color={successColor} />
            <ThemedText style={styles.metricText}>Transaction counts</ThemedText>
          </View>
        </View>
        <Button
          title="Generate Report"
          onPress={() => alert('Generate report pressed')}
          variant="primary"
          size="md"
          style={styles.actionButton}
          icon={<IconSymbol name="chart.line.uptrend.xyaxis" size={16} color="#ffffff" />}
        />
      </Card>

      <Card variant="outlined" style={styles.managementCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          SMS Notifications
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Automatic SMS notifications are sent to customers upon successful fuel dispensing. Includes transaction details, amount, and attendant information.
        </ThemedText>
        <View style={styles.notificationInfo}>
          <IconSymbol name="message.fill" size={20} color={accentColor} />
          <ThemedText style={styles.notificationText}>
            <ThemedText type="label">Note:</ThemedText> SMS functionality is simulated in this demo.
          </ThemedText>
        </View>
        <Button
          title="Test SMS"
          onPress={() => alert('Test SMS pressed')}
          variant="ghost"
          size="md"
          style={styles.actionButton}
          icon={<IconSymbol name="message.fill" size={16} color={primaryColor} />}
        />
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header styles
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIcon: {
    opacity: 0.9,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  fuelElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fuelElement1: {
    position: 'absolute',
    top: '25%',
    left: '10%',
  },
  fuelElement2: {
    position: 'absolute',
    top: '35%',
    right: '15%',
  },
  fuelElement3: {
    position: 'absolute',
    bottom: '30%',
    left: '20%',
  },
  fuelElement4: {
    position: 'absolute',
    bottom: '40%',
    right: '10%',
  },

  // Header card styles
  headerCard: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dashboardTitle: {
    color: '#ffffff',
  },
  welcomeText: {
    lineHeight: 22,
    color: '#64748b',
  },

  // Stats grid styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statIcon: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(45, 122, 79, 0.1)',
  },
  statValue: {
    marginBottom: 4,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    textAlign: 'center',
    color: '#64748b',
  },

  // Management card styles
  managementCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionDescription: {
    marginBottom: 16,
    lineHeight: 22,
    color: '#64748b',
  },
  actionButton: {
    marginTop: 12,
  },

  // Demo info styles
  demoInfo: {
    gap: 8,
    marginBottom: 16,
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoText: {
    flex: 1,
  },

  // Pricing info styles
  pricingInfo: {
    gap: 8,
    marginBottom: 16,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    flex: 1,
  },

  // Feature list styles
  featureList: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    flex: 1,
  },

  // Metrics list styles
  metricsList: {
    gap: 8,
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricText: {
    flex: 1,
  },

  // Notification info styles
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 8,
  },
  notificationText: {
    flex: 1,
  },
});