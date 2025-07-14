import React from 'react';
import { MapPin, Calendar, Award, Edit } from 'lucide-react';
import { formatDate, getBadgeColor } from '../../utils/helpers';

const ProfileCard = ({ user, onEdit }) => {
  return (
    <div className="card">
      <div className="flex items-start space-x-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-lg text-gray-600">{user.farmingType}</p>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>

          <p className="text-gray-700 mb-4">{user.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatDate(user.joinDate)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-500">Experience:</span>
              <p className="font-medium">{user.experienceYears} years</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Farm Size:</span>
              <p className="font-medium">{user.farmSize}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Badges & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(badge)}`}
                >
                  <Award className="w-3 h-3 inline mr-1" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {user.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;