import React from 'react';
import { MessageCircle, ThumbsUp, Calendar, Tag, User } from 'lucide-react';
import { timeAgo, getBadgeColor } from '../../utils/helpers';

const PostCard = ({ post, onViewPost }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-gray-900">{post.author}</h4>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{timeAgo(post.createdDate)}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(post.category)}`}>
              {post.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{post.votes}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.replies} replies</span>
              </div>
            </div>

            <button
              onClick={() => onViewPost(post)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
            >
              Join Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;