import React from 'react';
import { MapPin, Award, Clock, Star, MessageCircle } from 'lucide-react';
import { getBadgeColor } from '../../utils/helpers';

const MentorCard = ({ mentor, onRequestMentorship }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.farmingType}</p>
            </div>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {mentor.bio}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{mentor.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{mentor.experienceYears} years experience</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
              >
                <Award className="w-3 h-3 inline mr-1" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => onRequestMentorship(mentor)}
              className="flex-1 btn-primary text-sm"
            >
              Request Mentorship
            </button>
            <button className="px-4 py-2 text-primary-600 hover:text-primary-700 border border-primary-600 hover:border-primary-700 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;