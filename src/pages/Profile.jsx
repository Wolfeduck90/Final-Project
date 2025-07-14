import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { userService } from '../services/database'
import { mockUsers, mockListings, mockPosts, mockMentorships } from '../utils/mockData';
import ProfileForm from '../components/profile/ProfileForm'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { formatDate, getBadgeColor, timeAgo } from '../utils/helpers';

const Profile = () => {
  const [user, setUser] = useState(mockUsers[0]); // Current user
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Get user's activity data
  const userListings = mockListings.filter(listing => listing.farmerId === user.id);
  const userPosts = mockPosts.filter(post => post.authorId === user.id);
  const userMentorships = mockMentorships.filter(m => m.mentorId === user.id || m.menteeId === user.id);

  const handleEdit = () => {
    setEditForm({
      name: user.name,
      bio: user.bio,
      location: user.location,
      farmingType: user.farmingType,
      farmSize: user.farmSize,
      experienceYears: user.experienceYears
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({});
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const activityStats = [
    {
      title: "Products Listed",
      value: userListings.length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Forum Posts",
      value: userPosts.length,
      icon: <Award className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Mentorships",
      value: userMentorships.length,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-purple-600"
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      try {
        const { data, error } = await userService.getProfile(user.id)
        if (error) throw error
        setProfile(data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">
          Manage your profile information and view your activity
        </p>
      </div>

      {/* Profile Card */}
      {isEditing ? (
        <div className="card mb-8">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-1 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farming Type
                  </label>
                  <input
                    type="text"
                    name="farmingType"
                    value={editForm.farmingType}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Size
                  </label>
                  <input
                    type="text"
                    name="farmSize"
                    value={editForm.farmSize}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={editForm.experienceYears}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  className="btn-primary inline-flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary inline-flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileCard user={user} onEdit={handleEdit} />
      )}

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {activityStats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gray-100 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Listings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Listings</h3>
          {userListings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No listings yet</p>
          ) : (
            <div className="space-y-4">
              {userListings.slice(0, 3).map((listing) => (
                <div key={listing.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={listing.images[0]}
                    alt={listing.productType}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{listing.productType}</h4>
                    <p className="text-sm text-gray-600">{listing.expectedYield} • {listing.priceRange}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(listing.status)}`}>
                    {listing.status}
                  </span>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
              ))}
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          )}
        </div>

        {/* Recent Forum Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Forum Activity</h3>
          {userPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No forum posts yet</p>
          ) : (
            <div className="space-y-4">
              {userPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{timeAgo(post.createdDate)}</span>
                    <div className="flex space-x-3">
                      <span>{post.votes} votes</span>
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{profile.location}</p>
                    </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
              <div key={mentorship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Farming Type</p>
                      <p className="font-medium text-gray-900">{profile.farming_type}</p>
                    </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(mentorship.status)}`}>
                    {mentorship.status}
        {isEditing ? (
              {/* Bio Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {profile.bio || 'No bio provided yet.'}
                </p>
              </div>
              <ProfileCard user={profile} />
              {/* Badges Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.badges && profile.badges.length > 0 ? (
                    profile.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                      >
                        {badge}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No badges earned yet.</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
        )}
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium text-gray-900">{profile.name}</p>
                    </div>