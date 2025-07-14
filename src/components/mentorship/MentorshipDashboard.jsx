import React from 'react';
import { Calendar, Clock, CheckCircle, User, TrendingUp } from 'lucide-react';
import { formatDate, getProgressColor } from '../../utils/helpers';

const MentorshipDashboard = ({ mentorships }) => {
  const activeMentorships = mentorships.filter(m => m.status === 'Active');
  const completedMentorships = mentorships.filter(m => m.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Mentorships</p>
              <p className="text-2xl font-bold text-gray-900">{activeMentorships.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedMentorships.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(activeMentorships.reduce((acc, m) => acc + m.progress, 0) / activeMentorships.length || 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Mentorships */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Mentorships</h3>
        {activeMentorships.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No active mentorships</p>
        ) : (
          <div className="space-y-4">
            {activeMentorships.map((mentorship) => (
              <div key={mentorship.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Mentoring: {mentorship.mentee}
                    </h4>
                    <p className="text-sm text-gray-600">{mentorship.focus}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {mentorship.status}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{mentorship.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(mentorship.progress)}`}
                      style={{ width: `${mentorship.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Started: {formatDate(mentorship.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Next: {formatDate(mentorship.nextSession)}</span>
                    </div>
                  </div>
                  <span>{mentorship.completedSessions}/{mentorship.totalSessions} sessions</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Mentorships */}
      {completedMentorships.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Mentorships</h3>
          <div className="space-y-3">
            {completedMentorships.map((mentorship) => (
              <div key={mentorship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{mentorship.mentee}</h4>
                  <p className="text-sm text-gray-600">{mentorship.focus}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Completed
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {mentorship.completedSessions} sessions
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipDashboard;