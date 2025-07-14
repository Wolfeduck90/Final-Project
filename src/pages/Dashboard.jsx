import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Users, 
  MessageCircle, 
  Award,
  TrendingUp,
  Calendar,
  Bell,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { marketplaceService, forumService, mentorshipService, userService } from '../services/database';
import { useAsync } from '../hooks/useAsync';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { timeAgo, formatDate } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  
  const { data: listings, loading: listingsLoading } = useAsync(
    () => marketplaceService.getListings(),
    []
  );
  
  const { data: posts, loading: postsLoading } = useAsync(
    () => forumService.getPosts(),
    []
  );
  
  const { data: mentorships, loading: mentorshipsLoading } = useAsync(
    () => user ? mentorshipService.getMentorships(user.id) : Promise.resolve({ data: [] }),
    [user]
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data } = await userService.getProfile(user.id);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const recentListings = listings?.slice(0, 3) || [];
  const recentPosts = posts?.slice(0, 3) || [];
  const userMentorships = mentorships || [];

  const stats = [
    {
      title: "Active Listings",
      value: listings?.length?.toString() || "0",
      change: "+2 this week",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Mentorships",
      value: userMentorships.length.toString(),
      change: "1 active",
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Forum Posts",
      value: posts?.length?.toString() || "0",
      change: "+3 this month",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Community Score",
      value: "850",
      change: "+50 points",
      icon: <Award className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your farming community today.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">View Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="card mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mock recommendations for now */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900">Optimize Crop Rotation</h3>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                85% match
              </span>
            </div>
            <p className="text-sm text-blue-700 mb-3">Based on your soil data, consider rotating to legumes next season.</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn More →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/marketplace"
                className="flex items-center justify-between p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-primary-900">List New Product</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/forum"
                className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Start Discussion</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/mentorship"
                className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Find Mentor</span>
                </div>
                <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Mentorship Session</p>
                  <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Market Analysis</p>
                  <p className="text-sm text-gray-600">Friday, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Marketplace Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Marketplace Activity</h2>
              <Link
                to="/marketplace"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            {listingsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={listing.images?.[0] || '/placeholder-image.jpg'}
                      alt={listing.product_type}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{listing.product_type}</h3>
                      <p className="text-sm text-gray-600">{listing.expected_yield} • {listing.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary-600">{listing.price_range}</p>
                      <p className="text-xs text-gray-500">{listing.status}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent marketplace activity</p>
                )}
              </div>
            )}
          </div>

          {/* Recent Forum Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Forum Discussions</h2>
              <Link
                to="/forum"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            {postsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{post.title}</h3>
                      <span className="text-xs text-gray-500">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">by {post.author}</span>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>{post.votes} votes</span>
                        <span>{post.replies_count} replies</span>
                      </div>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent forum discussions</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;