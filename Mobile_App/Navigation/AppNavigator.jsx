// Mobile_App/navigation/AppNavigator.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import MentorScreen from '../screens/MentorScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import ForumScreen from '../screens/ForumScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mentor" component={MentorScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Forum" component={ForumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
