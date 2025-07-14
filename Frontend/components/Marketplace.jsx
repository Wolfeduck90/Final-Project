// Frontend/components/Marketplace.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Marketplace = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/marketplace`)
      .then(res => setListings(res.data.listings || []))
      .catch(err => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Available Produce</h2>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <ul>
          {listings.map(item => (
            <li key={item.listing_id} className="mb-3 border-b pb-2">
              <strong>{item.produce_type}</strong> – {item.expected_yield_kg} kg @ R{item.estimated_price_ZAR}/kg
              <div className="text-sm text-gray-500">Status: {item.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Marketplace;
