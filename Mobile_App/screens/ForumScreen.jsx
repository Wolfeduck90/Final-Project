// Mobile_App/screens/ForumScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forum-posts`)
      .then(res => setPosts(res.data.posts || []))
      .catch(err => console.error("Forum fetch error:", err));
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>💬 Community Forum</Text>
      {posts.length === 0 ? (
        <Text>No posts yet. Be the first to spark a conversation.</Text>
      ) : (
        posts.map((post, index) => (
          <View key={index} style={{ marginBottom: 16, padding: 12, borderRadius: 8, backgroundColor: '#EFEFEF' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{post.topic}</Text>
            <Text style={{ color: '#444', marginVertical: 4 }}>{post.content}</Text>
            {post.media_url && (
              <Image source={{ uri: post.media_url }} style={{ height: 120, borderRadius: 6, marginTop: 8 }} />
            )}
            <Text style={{ fontSize: 12, color: '#777', marginTop: 6 }}>Posted by User {post.author_id}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ForumScreen;
