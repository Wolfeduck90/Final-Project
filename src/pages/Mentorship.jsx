import React, { useState, useEffect } from 'react';
import { Users, Search, Award, Clock, Star } from 'lucide-react';
import MentorCard from '../components/mentorship/MentorCard';
import MentorshipDashboard from '../components/mentorship/MentorshipDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { mockUsers, mockMentorships, locations } from '../utils/mockData';
import { searchItems, filterByCategory } from '../utils/helpers';

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('find-mentors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  // Get available mentors (users with Mentor badge)
  const availableMentors = mockUsers.filter(user => 
    user.badges.includes('Mentor') || user.experienceYears >= 10
  );

  const specialties = [
    'All Specialties',
    'Organic farming',
    'Pest control',
    'Crop rotation',
    'Drought management',
    'Soil conservation',
    'Precision farming',
    'Market analysis'
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMentors(availableMentors);
      setFilteredMentors(availableMentors);
      setMentorships(mockMentorships);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = mentors;

    // Search filter
    if (searchTerm) {
      filtered = searchItems(filtered, searchTerm, ['name', 'bio', 'farmingType']);
    }

    // Location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(mentor => mentor.location.includes(selectedLocation));
    }

    // Specialty filter
    if (selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter(mentor => 
        mentor.specialties.some(specialty => 
          specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
      );
    }

    setFilteredMentors(filtered);
  }, [mentors, searchTerm, selectedLocation, selectedSpecialty]);

  const handleRequestMentorship = (mentor) => {
    // In a real app, this would send a mentorship request
    alert(`Mentorship request sent to ${mentor.name}!`);
  };

  const stats = [
    {
      title: "Available Mentors",
      value: availableMentors.length.toString(),
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Success Rate",
      value: "94%",
      icon: <Star className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Avg. Response Time",
      value: "2 hours",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Specialties",
      value: specialties.length - 1,
      icon: <Award className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
        <p className="text-gray-600 mt-1">
          Connect with experienced farmers and grow your agricultural knowledge
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('find-mentors')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'find-mentors'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Find Mentors
          </button>
          <button
            onClick={() => setActiveTab('my-mentorships')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-mentorships'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Mentorships
          </button>
        </nav>
      </div>

      {activeTab === 'find-mentors' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="card space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Mentors
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input-field"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input-field"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('All Locations');
                  setSelectedSpecialty('All Specialties');
                }}
                className="w-full btn-secondary text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredMentors.length} mentors available`}
              </p>
              <select className="input-field w-auto">
                <option>Sort by: Rating</option>
                <option>Sort by: Experience</option>
                <option>Sort by: Location</option>
                <option>Sort by: Availability</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredMentors.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👨‍🌾</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onRequestMentorship={handleRequestMentorship}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <MentorshipDashboard mentorships={mentorships} />
      )}
    </div>
  );
};

export default Mentorship;