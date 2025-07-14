import React from 'react';
import { MapPin, Calendar, Tag, Eye } from 'lucide-react';
import { formatDate, getBadgeColor, getStatusColor } from '../../utils/helpers';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <div className="relative mb-4">
        <img
          src={product.images[0]}
          alt={product.productType}
          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {product.expectedYield}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {product.productType}
          </h3>
          <span className="text-lg font-bold text-primary-600">
            {product.priceRange}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(product.estimatedHarvestDate)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.certifications.map((cert, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(cert)}`}
            >
              {cert}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.category)}`}>
            <Tag className="w-3 h-3 inline mr-1" />
            {product.category}
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;