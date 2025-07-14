import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { userService } from '../../services/database'
import { User, MapPin, Tractor, FileText, Save, AlertCircle, CheckCircle } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

const ProfileForm = () => {
  const { user, updateProfile } = useAuth()
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    farming_type: '',
    bio: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await userService.getProfile(user.id)
        if (error) throw error

        setProfile(data)
        setFormData({
          name: data.name || '',
          location: data.location || '',
          farming_type: data.farming_type || '',
          bio: data.bio || ''
        })
      } catch (err) {
        setError('Failed to load profile')
        console.error('Profile fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    
    try {
      await updateProfile(formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update profile')
      console.error('Profile update failed:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-gray-600">Update your farming profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Profile updated successfully!
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Gauteng, South Africa"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="farming_type" className="block text-sm font-medium text-gray-700 mb-2">
              Farming Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tractor className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="farming_type"
                name="farming_type"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.farming_type}
                onChange={handleChange}
              >
                <option value="">Select farming type</option>
                <option value="vegetable">Vegetable Farming</option>
                <option value="fruit">Fruit Farming</option>
                <option value="grain">Grain Farming</option>
                <option value="livestock">Livestock</option>
                <option value="mixed">Mixed Farming</option>
                <option value="organic">Organic Farming</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Tell us about your farming experience and interests..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm