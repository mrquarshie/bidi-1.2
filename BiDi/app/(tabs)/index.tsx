import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const accentColor = useThemeColor({}, 'accent');
  const successColor = useThemeColor({}, 'success');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: primaryColor, dark: primaryColor }}
      headerImage={
        <View style={styles.headerContent}>
          <IconSymbol
            size={120}
            color="#ffffff"
            name="fuelpump.fill"
            style={styles.headerIcon}
          />
          <View style={styles.fuelDrops}>
            <IconSymbol name="drop.fill" size={16} color="rgba(255,255,255,0.3)" style={styles.fuelDrop1} />
            <IconSymbol name="drop.fill" size={20} color="rgba(255,255,255,0.4)" style={styles.fuelDrop2} />
            <IconSymbol name="drop.fill" size={14} color="rgba(255,255,255,0.2)" style={styles.fuelDrop3} />
            <IconSymbol name="drop.fill" size={18} color="rgba(255,255,255,0.3)" style={styles.fuelDrop4} />
          </View>
          <View style={styles.headerGradient} />
        </View>
      }>
      
      {/* Welcome Section */}
      <Card variant="elevated" style={styles.welcomeCard}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome to BiD!
          </ThemedText>
          <HelloWave />
        </View>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Fuel Station Management System
        </ThemedText>
        <ThemedText style={styles.description}>
          Streamline your fuel station operations with our comprehensive management platform for pump attendants.
        </ThemedText>
      </Card>

      {/* Quick Actions */}
      <Card variant="outlined" style={styles.actionsCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        <View style={styles.actionButtons}>
          <Button
            title="Station Login"
            onPress={() => alert('Login pressed')}
            variant="primary"
            size="lg"
            style={styles.actionButton}
            icon={<IconSymbol name="person.fill" size={20} color="#ffffff" />}
          />
          <Button
            title="Dashboard"
            onPress={() => alert('Dashboard pressed')}
            variant="outline"
            size="lg"
            style={styles.actionButton}
            icon={<IconSymbol name="fuelpump.fill" size={20} color={primaryColor} />}
          />
        </View>
      </Card>

      {/* Features Grid */}
      <View style={styles.featuresGrid}>
        <Card variant="elevated" style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <IconSymbol name="fuelpump.fill" size={32} color={successColor} />
          </View>
          <ThemedText type="heading" style={styles.featureTitle}>
            Token Validation
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Validate fuel tokens and process dispensing transactions with ease.
          </ThemedText>
        </Card>

        <Card variant="elevated" style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <IconSymbol name="drop.fill" size={32} color={accentColor} />
          </View>
          <ThemedText type="heading" style={styles.featureTitle}>
            Manual Sales
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Process direct fuel sales without tokens for immediate transactions.
          </ThemedText>
        </Card>

        <Card variant="elevated" style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <IconSymbol name="chart.bar.fill" size={32} color={primaryColor} />
          </View>
          <ThemedText type="heading" style={styles.featureTitle}>
            Analytics
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Track sales, generate reports, and monitor transaction history.
          </ThemedText>
        </Card>

        <Card variant="elevated" style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <IconSymbol name="message.fill" size={32} color={accentColor} />
          </View>
          <ThemedText type="heading" style={styles.featureTitle}>
            SMS Notifications
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Automatic SMS notifications for successful fuel dispensing.
          </ThemedText>
        </Card>
      </View>

      {/* Station Info */}
      <Card variant="outlined" style={styles.stationCard}>
        <ThemedText type="heading" style={styles.sectionTitle}>
          Station Information
        </ThemedText>
        <View style={styles.stationInfo}>
          <View style={styles.stationItem}>
            <IconSymbol name="building.2.fill" size={20} color={primaryColor} />
            <ThemedText style={styles.stationText}>Goil Station Accra (ST001)</ThemedText>
          </View>
          <View style={styles.stationItem}>
            <IconSymbol name="person.fill" size={20} color={primaryColor} />
            <ThemedText style={styles.stationText}>Manager: John Doe</ThemedText>
          </View>
          <View style={styles.stationItem}>
            <IconSymbol name="phone.fill" size={20} color={primaryColor} />
            <ThemedText style={styles.stationText}>+233 123456</ThemedText>
          </View>
        </View>
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
  fuelDrops: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fuelDrop1: {
    position: 'absolute',
    top: '20%',
    left: '15%',
  },
  fuelDrop2: {
    position: 'absolute',
    top: '30%',
    right: '20%',
  },
  fuelDrop3: {
    position: 'absolute',
    bottom: '25%',
    left: '25%',
  },
  fuelDrop4: {
    position: 'absolute',
    bottom: '35%',
    right: '15%',
  },

  // Welcome card styles
  welcomeCard: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  welcomeTitle: {
    color: '#ffffff',
  },
  subtitle: {
    marginBottom: 8,
    color: '#64748b',
  },
  description: {
    lineHeight: 22,
    color: '#64748b',
  },

  // Actions card styles
  actionsCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },

  // Features grid styles
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  featureIcon: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(45, 122, 79, 0.1)',
  },
  featureTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#64748b',
  },

  // Station info styles
  stationCard: {
    marginBottom: 20,
  },
  stationInfo: {
    gap: 12,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stationText: {
    flex: 1,
  },
});
