// Mobile_App/utils/api.js

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'https://your-backend.com/api';

export const fetchMentors = async (profile) => {
  try {
    const res = await axios.post(`${API_BASE}/mentor-pairing`, profile);
    return res.data.recommended_mentors || [];
  } catch (err) {
    console.error("Mentor fetch failed:", err);
    return [];
  }
};

export const fetchMarketplace = async () => {
  try {
    const res = await axios.get(`${API_BASE}/marketplace`);
    return res.data.listings || [];
  } catch (err) {
    console.error("Marketplace fetch failed:", err);
    return [];
  }
};

export const fetchForumPosts = async () => {
  try {
    const res = await axios.get(`${API_BASE}/forum-posts`);
    return res.data.posts || [];
  } catch (err) {
    console.error("Forum fetch failed:", err);
    return [];
  }
};
