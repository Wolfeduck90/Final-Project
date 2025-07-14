// Frontend/components/Mentor.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mentor = ({ menteeProfile }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    if (!menteeProfile) return;

    axios.post(`${process.env.REACT_APP_API_URL}/mentor-pairing`, menteeProfile)
      .then(res => setMentors(res.data.recommended_mentors || []))
      .catch(err => console.error("Mentor fetch error:", err));
  }, [menteeProfile]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧑‍🌾 Recommended Mentors</h2>
      {mentors.length === 0 ? (
        <p>No mentors found for your profile.</p>
      ) : (
        <ul>
          {mentors.map(mentor => (
            <li key={mentor.full_name} className="mb-3 border-b pb-2">
              <strong>{mentor.full_name}</strong> — {mentor.location}
              <div className="text-sm">Crop: {mentor.produce_type}</div>
              <div className="text-sm text-gray-500">Experience: {mentor.experience_years} years</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mentor;
