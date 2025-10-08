import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import EnterTokenScreen from './EnterTokenScreen';
import ManualSaleScreen from './ManualSaleScreen';
import HistoryScreen from './HistoryScreen';
import ReportsScreen from './ReportsScreen';
import SettingsScreen from './SettingsScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard': iconName = 'home'; break;
            case 'EnterToken': iconName = 'qr-code'; break;
            case 'ManualSale': iconName = 'plus-circle'; break;
            case 'History': iconName = 'history'; break;
            case 'Reports': iconName = 'chart-bar'; break;
            case 'Settings': iconName = 'cog'; break;
            default: iconName = 'circle';
          }
          return <Icon name={iconName} type="font-awesome-5" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="EnterToken" component={EnterTokenScreen} />
      <Tab.Screen name="ManualSale" component={ManualSaleScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}