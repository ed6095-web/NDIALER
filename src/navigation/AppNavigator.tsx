import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import DialpadScreen from '../screens/DialpadScreen';
import ContactsScreen from '../screens/ContactsScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'keypad';

            if (route.name === 'Dialpad') {
              iconName = focused ? 'keypad' : 'keypad-outline';
            } else if (route.name === 'Contacts') {
              iconName = focused ? 'people' : 'people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 0,
            elevation: 0, // for Android
            shadowOpacity: 0, // for iOS
          },
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen 
          name="Dialpad" 
          component={DialpadScreen} 
          options={{ title: 'Keypad' }} 
        />
        <Tab.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ title: 'Contacts' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
