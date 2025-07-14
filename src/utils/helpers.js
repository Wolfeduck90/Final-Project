// Date formatting utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    month: 'short',
    day: 'numeric'
  });
};

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDateShort(dateString);
};

// Text utilities
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Number formatting
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-ZA').format(num);
};

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^(\+27|0)[0-9]{9}$/;
  return re.test(phone);
};

// Search and filter utilities
export const searchItems = (items, searchTerm, searchFields) => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    searchFields.some(field => 
      item[field]?.toLowerCase().includes(term)
    )
  );
};

export const filterByCategory = (items, category, categoryField = 'category') => {
  if (!category || category === 'All Categories' || category === 'All Topics' || category === 'All Locations') {
    return items;
  }
  return items.filter(item => item[categoryField] === category);
};

// Badge utilities
export const getBadgeColor = (badge) => {
  const colors = {
    'Mentor': 'bg-blue-100 text-blue-800',
    'Top Seller': 'bg-green-100 text-green-800',
    'Community Helper': 'bg-purple-100 text-purple-800',
    'Innovator': 'bg-orange-100 text-orange-800',
    'Water Conservation Expert': 'bg-cyan-100 text-cyan-800',
    'Rising Star': 'bg-yellow-100 text-yellow-800',
    'Tech Adopter': 'bg-indigo-100 text-indigo-800',
    'Organic': 'bg-green-100 text-green-800',
    'Pesticide-free': 'bg-emerald-100 text-emerald-800',
    'Quality Assured': 'bg-blue-100 text-blue-800',
    'Premium': 'bg-amber-100 text-amber-800',
    'Nutritionally Enhanced': 'bg-pink-100 text-pink-800',
    'Greenhouse Grown': 'bg-teal-100 text-teal-800'
  };
  return colors[badge] || 'bg-gray-100 text-gray-800';
};

// Status utilities
export const getStatusColor = (status) => {
  const colors = {
    'Available': 'bg-green-100 text-green-800',
    'Pre-order': 'bg-yellow-100 text-yellow-800',
    'Sold Out': 'bg-red-100 text-red-800',
    'Active': 'bg-green-100 text-green-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Booked': 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Progress utilities
export const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-yellow-500';
  if (progress >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};