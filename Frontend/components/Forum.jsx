// Frontend/components/Forum.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forum-posts`)
      .then(res => setPosts(res.data.posts || []))
      .catch(err => console.error("Error loading forum posts:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">💬 Peer Learning Forum</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share!</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.post_id} className="mb-4 border-b pb-2">
              <div className="text-sm text-gray-500">Posted by User {post.author_id}</div>
              <h3 className="font-semibold">{post.topic}</h3>
              <p>{post.content}</p>
              {post.media_url && (
                <img src={post.media_url} alt="Post media" className="mt-2 rounded w-40" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forum;
