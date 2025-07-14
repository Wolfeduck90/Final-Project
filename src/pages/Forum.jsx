import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { forumService } from '../services/database';
import { useAsync } from '../hooks/useAsync';
import PostCard from '../components/forum/PostCard';
import CreatePost from '../components/forum/CreatePost';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { mockPosts, forumCategories } from '../utils/mockData';
import { searchItems, filterByCategory } from '../utils/helpers';

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const { data: forumPosts, loading: forumLoading, error, refetch } = useAsync(
    () => forumService.getPosts(selectedCategory === 'All Topics' ? null : selectedCategory),
    [selectedCategory]
  );

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = searchItems(filtered, searchTerm, ['title', 'content', 'author']);
    }

    // Category filter
    if (selectedCategory !== 'All Topics') {
      filtered = filterByCategory(filtered, selectedCategory, 'category');
    }

    // Sort posts
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'oldest':
          return new Date(a.createdDate) - new Date(b.createdDate);
        case 'most_votes':
          return b.votes - a.votes;
        case 'most_replies':
          return b.replies - a.replies;
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      authorId: 1, // Current user
      author: "You",
      ...postData,
      replies: 0,
      votes: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setPosts([newPost, ...posts]);
  };

  const handlePostCreated = () => {
    setIsCreatePostOpen(false);
    refetch();
  };

  const handleViewPost = (post) => {
    // In a real app, this would navigate to the post detail page
    console.log('Viewing post:', post);
  };

  const trendingTopics = [
    { name: "Drought Management", posts: 23 },
    { name: "Organic Farming", posts: 18 },
    { name: "Pest Control", posts: 15 },
    { name: "Market Prices", posts: 12 },
    { name: "Equipment Sharing", posts: 9 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600 mt-1">
            Connect, learn, and share knowledge with fellow farmers
          </p>
        </div>
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="mt-4 md:mt-0 btn-primary inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div className="card">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {forumCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <h3 className="font-semibold text-gray-900">Trending Topics</h3>
            </div>
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{topic.name}</span>
                  <span className="text-gray-500">{topic.posts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${forumPosts?.length || 0} discussions found`}
            </p>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_votes">Most Votes</option>
                <option value="most_replies">Most Replies</option>
              </select>
            </div>
          </div>

          {/* Posts */}
          {forumLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load forum posts</p>
              <button 
                onClick={refetch}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : forumPosts?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="btn-primary"
              >
                Start a Discussion
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {forumPosts?.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onViewPost={handleViewPost}
                />
              )) || (
                <p className="text-gray-500 text-center py-8">No posts found for this topic</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleCreatePost}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Forum;