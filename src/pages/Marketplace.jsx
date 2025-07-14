import React, { useState, useEffect } from 'react';
import { Plus, Eye, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { marketplaceService } from '../services/database';
import { useAsync } from '../hooks/useAsync';
import MarketplaceGrid from '../components/marketplace/MarketplaceGrid';
import FilterPanel from '../components/marketplace/FilterPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { mockListings, mockUsers } from '../utils/mockData';
import { searchItems, filterByCategory } from '../utils/helpers';

const Marketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    priceRange: ''
  });

  const { data: marketplaceListings, loading: marketplaceLoading, error, refetch } = useAsync(
    () => marketplaceService.getListings(filters),
    [filters]
  );

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setListings(mockListings);
      setFilteredListings(mockListings);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = listings;

    // Search filter
    if (searchTerm) {
      filtered = searchItems(filtered, searchTerm, ['productType', 'description', 'location']);
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filterByCategory(filtered, selectedCategory, 'category');
    }

    // Location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filterByCategory(filtered, selectedLocation, 'location');
    }

    // Status filter
    if (selectedStatus !== 'All Status') {
      filtered = filterByCategory(filtered, selectedStatus, 'status');
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, selectedCategory, selectedLocation, selectedStatus]);

  const filteredMarketplaceListings = marketplaceListings?.filter(listing => {
    if (filters.search && !listing.productType?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !listing.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    
    if (filters.location && listing.location !== filters.location) {
      return false
    }
    
    if (filters.category && listing.category !== filters.category) {
      return false
    }
    
    if (filters.priceRange) {
      // Add price range filtering logic
    }

    return true
  }) || []

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedStatus('All Status');
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const getSellerInfo = (farmerId) => {
    return mockUsers.find(user => user.id === farmerId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">
            Discover fresh produce from local farmers across South Africa
          </p>
        </div>
        <button className="mt-4 md:mt-0 btn-primary inline-flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          List Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            onClear={handleClearFilters}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${filteredListings.length} products found`}
            </p>
            <select className="input-field w-auto">
              <option>Sort by: Newest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Harvest Date</option>
            </select>
          </div>

          {/* Products Grid */}
          {marketplaceLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load marketplace listings</p>
              <button 
                onClick={refetch}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <MarketplaceGrid
              products={filteredListings}
              listings={filteredMarketplaceListings}
              loading={loading}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.productType}</h2>
                <button
                  onClick={closeProductModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.productType}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        {selectedProduct.priceRange}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {selectedProduct.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedProduct.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Harvest: {selectedProduct.estimatedHarvestDate}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Expected Yield:</span> {selectedProduct.expectedYield}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full btn-primary">
                        Contact Seller
                      </button>
                      <button className="w-full btn-secondary">
                        Add to Watchlist
                      </button>
                    </div>
                  </div>

                  {/* Seller Info */}
                  {(() => {
                    const seller = getSellerInfo(selectedProduct.farmerId);
                    return seller ? (
                      <div className="card">
                        <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                        <div className="flex items-center space-x-3">
                          <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{seller.name}</p>
                            <p className="text-sm text-gray-600">{seller.farmingType}</p>
                            <p className="text-sm text-gray-600">{seller.experienceYears} years experience</p>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;