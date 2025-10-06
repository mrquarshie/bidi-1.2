import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="fuelpump.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Fuel Station Dashboard
        </ThemedText>
      </ThemedView>
      <ThemedText>Welcome to the BiDi Fuel Station Management System.</ThemedText>
      <Collapsible title="Token Management">
        <ThemedText>
          Validate fuel tokens and process fuel dispensing transactions. Enter token codes to verify
          customer purchases and dispense the correct amount of fuel.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Demo Token:</ThemedText> TOKEN123
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Demo Station:</ThemedText> ST001
        </ThemedText>
      </Collapsible>
      <Collapsible title="Manual Sales">
        <ThemedText>
          Process direct fuel sales without tokens. Enter customer phone numbers and fuel amounts
          for immediate transactions.
        </ThemedText>
        <ThemedText>
          Available products: Petrol (GHC 15.50/L), Diesel (GHC 14.20/L)
        </ThemedText>
      </Collapsible>
      <Collapsible title="Transaction History">
        <ThemedText>
          View all completed transactions with filtering options by date and product type.
          Track daily sales and customer interactions.
        </ThemedText>
        <ThemedText>
          Features: Date filtering, product filtering, export capabilities
        </ThemedText>
      </Collapsible>
      <Collapsible title="Reports & Analytics">
        <ThemedText>
          Generate comprehensive reports on fuel sales, transaction volumes, and revenue.
          Export data for accounting and analysis purposes.
        </ThemedText>
        <ThemedText>
          Metrics: Total liters dispensed, revenue tracking, transaction counts
        </ThemedText>
      </Collapsible>
      <Collapsible title="SMS Notifications">
        <ThemedText>
          Automatic SMS notifications are sent to customers upon successful fuel dispensing.
          Includes transaction details, amount, and attendant information.
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Note:</ThemedText> SMS functionality is simulated in this demo.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Station Information">
        <ThemedText>
          Current station: Goil Station Accra (ST001)
        </ThemedText>
        <ThemedText>
          Manager: John Doe
        </ThemedText>
        <ThemedText>
          Contact: +233 123456
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});