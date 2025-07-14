// Frontend/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌿 Welcome to Inkululeko</h1>
      <p className="mb-6 text-gray-700">
        Empowering South African farmers through community, technology, and connection. Match with mentors, share tools, predict crop prices, and join the forum.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/marketplace" className="block p-4 border rounded shadow hover:bg-green-50">
          📦 View Produce Listings
        </Link>
        <Link to="/mentor" className="block p-4 border rounded shadow hover:bg-green-50">
          🧑‍🏫 Find a Mentor
        </Link>
        <Link to="/forum" className="block p-4 border rounded shadow hover:bg-green-50">
          💬 Join Peer Discussions
        </Link>
      </div>
    </div>
  );
};

export default Home;
