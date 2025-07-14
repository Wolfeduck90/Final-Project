// Mobile_App/screens/HomeScreen.jsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#17803D' }}>
        Inkululeko Home
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30, color: '#444' }}>
        Choose a path: mentorship, marketplace, or community discussion.
      </Text>

      <TouchableOpacity
        style={{ padding: 14, backgroundColor: '#17803D', borderRadius: 8, marginBottom: 16 }}
        onPress={() => navigation.navigate('Mentor', { menteeProfile: {/* add from context */} })}
      >
        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Find a Mentor 🧑‍🏫</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 14, backgroundColor: '#17803D', borderRadius: 8, marginBottom: 16 }}
        onPress={() => navigation.navigate('Marketplace')}
      >
        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Browse Marketplace 📦</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 14, backgroundColor: '#17803D', borderRadius: 8 }}
        onPress={() => navigation.navigate('Forum')}
      >
        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Join the Forum 💬</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
