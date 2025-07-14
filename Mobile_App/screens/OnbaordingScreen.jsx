// Mobile_App/screens/OnboardingScreen.jsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F5F5F5' }}>
      <Image source={require('../../Assets/logo.png')} style={{ width: 80, height: 80, alignSelf: 'center' }} />
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 24, textAlign: 'center', color: '#17803D' }}>
        Welcome to Inkululeko
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
        Match with mentors, share equipment, predict crop prices, and learn from fellow farmers.
      </Text>

      <TouchableOpacity
        style={{ marginTop: 40, padding: 14, backgroundColor: '#17803D', borderRadius: 8 }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
