// Mobile_App/screens/MentorScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MentorScreen = ({ route }) => {
  const [mentors, setMentors] = useState([]);
  const { menteeProfile } = route.params || {};

  useEffect(() => {
    if (!menteeProfile) return;

    axios.post(`${process.env.REACT_APP_API_URL}/mentor-pairing`, menteeProfile)
      .then(res => setMentors(res.data.recommended_mentors || []))
      .catch(err => console.error("Mentor fetch error:", err));
  }, [menteeProfile]);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>🧑‍🌾 Mentors Near You</Text>
      {mentors.length === 0 ? (
        <Text>No mentors found for your profile.</Text>
      ) : (
        mentors.map((mentor, index) => (
          <View key={index} style={{ marginBottom: 16, padding: 12, borderRadius: 8, backgroundColor: '#F3F3F3' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{mentor.full_name}</Text>
            <Text>Crop: {mentor.produce_type}</Text>
            <Text>Years Experience: {mentor.experience_years}</Text>
            <Text>Location: {mentor.location}</Text>
            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#17803D', padding: 10, borderRadius: 6 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Request Mentorship</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MentorScreen;
