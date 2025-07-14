// Mobile_App/screens/MarketplaceScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const MarketplaceScreen = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/marketplace`)
      .then(res => setListings(res.data.listings || []))
      .catch(err => console.error("Marketplace fetch error:", err));
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>📦 Produce Listings</Text>
      {listings.length === 0 ? (
        <Text>No listings yet. Check back soon.</Text>
      ) : (
        listings.map((item, index) => (
          <View key={index} style={{ marginBottom: 16, padding: 12, borderRadius: 8, backgroundColor: '#F4F4F4' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.produce_type}</Text>
            <Text>Quantity: {item.expected_yield_kg} kg</Text>
            <Text>Price: R{item.estimated_price_ZAR}/kg</Text>
            <Text>Status: {item.status}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MarketplaceScreen;
