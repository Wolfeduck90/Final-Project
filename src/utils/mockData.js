// User Profile Mock Data
export const mockUsers = [
  {
    id: 1,
    name: "Thabo Mokoena",
    location: "Gauteng, South Africa",
    farmingType: "Vegetable Farming",
    bio: "Experienced vegetable farmer specializing in tomatoes and peppers. Passionate about sustainable farming practices.",
    badges: ["Mentor", "Top Seller", "Community Helper"],
    joinDate: "2024-01-15",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    experienceYears: 15,
    farmSize: "5 hectares",
    specialties: ["Organic farming", "Pest control", "Crop rotation"]
  },
  {
    id: 2,
    name: "Nomsa Dlamini",
    location: "KwaZulu-Natal, South Africa",
    farmingType: "Grain Farming",
    bio: "Maize and sorghum farmer with focus on drought-resistant varieties.",
    badges: ["Innovator", "Water Conservation Expert"],
    joinDate: "2024-02-20",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    experienceYears: 8,
    farmSize: "12 hectares",
    specialties: ["Drought management", "Grain storage", "Soil conservation"]
  },
  {
    id: 3,
    name: "Sipho Khumalo",
    location: "Limpopo, South Africa",
    farmingType: "Mixed Farming",
    bio: "Young farmer combining traditional methods with modern technology.",
    badges: ["Rising Star", "Tech Adopter"],
    joinDate: "2024-03-10",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    experienceYears: 3,
    farmSize: "8 hectares",
    specialties: ["Precision farming", "Mobile apps", "Market analysis"]
  }
];

// Marketplace Listings Mock Data
export const mockListings = [
  {
    id: 1,
    farmerId: 1,
    productType: "Tomatoes",
    expectedYield: "500kg",
    estimatedHarvestDate: "2025-08-15",
    priceRange: "R15-20 per kg",
    status: "Available",
    location: "Gauteng",
    description: "Fresh organic tomatoes, pesticide-free. Perfect for local markets and restaurants.",
    images: ["https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"],
    category: "Vegetables",
    quality: "Organic",
    certifications: ["Organic", "Pesticide-free"]
  },
  {
    id: 2,
    farmerId: 2,
    productType: "Maize",
    expectedYield: "2000kg",
    estimatedHarvestDate: "2025-09-20",
    priceRange: "R4-6 per kg",
    status: "Pre-order",
    location: "KwaZulu-Natal",
    description: "High-quality white maize, drought-resistant variety with excellent storage properties.",
    images: ["https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"],
    category: "Grains",
    quality: "Premium",
    certifications: ["Quality Assured"]
  },
  {
    id: 3,
    farmerId: 3,
    productType: "Sweet Potatoes",
    expectedYield: "800kg",
    estimatedHarvestDate: "2025-07-30",
    priceRange: "R8-12 per kg",
    status: "Available",
    location: "Limpopo",
    description: "Orange-fleshed sweet potatoes, rich in beta-carotene and perfect for health-conscious consumers.",
    images: ["https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"],
    category: "Root Vegetables",
    quality: "Premium",
    certifications: ["Nutritionally Enhanced"]
  },
  {
    id: 4,
    farmerId: 1,
    productType: "Bell Peppers",
    expectedYield: "300kg",
    estimatedHarvestDate: "2025-08-10",
    priceRange: "R25-30 per kg",
    status: "Available",
    location: "Gauteng",
    description: "Colorful bell peppers in red, yellow, and green varieties. Greenhouse grown for consistent quality.",
    images: ["https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"],
    category: "Vegetables",
    quality: "Premium",
    certifications: ["Greenhouse Grown"]
  }
];

// Forum Posts Mock Data
export const mockPosts = [
  {
    id: 1,
    authorId: 1,
    author: "Thabo Mokoena",
    topic: "Pest Control",
    title: "Natural pest control methods for tomatoes",
    content: "I've been experimenting with companion planting and natural sprays for pest control in my tomato fields. Marigolds and basil seem to work well as companion plants. Has anyone tried neem oil solutions?",
    replies: 8,
    votes: 15,
    createdDate: "2025-01-10",
    tags: ["organic", "pest-control", "tomatoes", "companion-planting"],
    category: "Crop Management"
  },
  {
    id: 2,
    authorId: 2,
    author: "Nomsa Dlamini",
    topic: "Water Management",
    title: "Drought-resistant farming techniques",
    content: "With climate change affecting rainfall patterns, I've been implementing water conservation techniques. Mulching and drip irrigation have made a huge difference in my maize yields.",
    replies: 12,
    votes: 23,
    createdDate: "2025-01-08",
    tags: ["drought", "water-conservation", "climate-change", "maize"],
    category: "Sustainability"
  },
  {
    id: 3,
    authorId: 3,
    author: "Sipho Khumalo",
    topic: "Technology",
    title: "Mobile apps for farm management",
    content: "I've been using several mobile apps to track my farming activities. Weather apps, soil testing apps, and market price trackers have really improved my decision-making. What apps do you recommend?",
    replies: 6,
    votes: 18,
    createdDate: "2025-01-05",
    tags: ["technology", "mobile-apps", "farm-management", "digital-farming"],
    category: "Technology"
  },
  {
    id: 4,
    authorId: 1,
    author: "Thabo Mokoena",
    topic: "Marketing",
    title: "Direct-to-consumer sales strategies",
    content: "I've started selling directly to consumers through farmers markets and online platforms. The profit margins are much better than selling to wholesalers. Here are some tips that worked for me...",
    replies: 14,
    votes: 31,
    createdDate: "2025-01-03",
    tags: ["marketing", "direct-sales", "farmers-markets", "profit"],
    category: "Business"
  }
];

// Mentorship Connections Mock Data
export const mockMentorships = [
  {
    id: 1,
    mentorId: 1,
    menteeId: 3,
    mentor: "Thabo Mokoena",
    mentee: "Sipho Khumalo",
    status: "Active",
    startDate: "2025-01-01",
    focus: "Organic farming techniques and pest management",
    progress: 75,
    nextSession: "2025-01-15",
    completedSessions: 6,
    totalSessions: 8
  },
  {
    id: 2,
    mentorId: 2,
    menteeId: 3,
    mentor: "Nomsa Dlamini",
    mentee: "Sipho Khumalo",
    status: "Completed",
    startDate: "2024-11-01",
    focus: "Water conservation and drought management",
    progress: 100,
    completedSessions: 5,
    totalSessions: 5
  }
];

// Equipment Sharing Mock Data
export const mockEquipment = [
  {
    id: 1,
    ownerId: 1,
    owner: "Thabo Mokoena",
    equipmentType: "Tractor",
    description: "John Deere 5055E, 55HP, perfect for medium-sized farms",
    availability: "Weekends",
    status: "Available",
    location: "Gauteng",
    pricePerDay: "R800",
    images: ["https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"]
  },
  {
    id: 2,
    ownerId: 2,
    owner: "Nomsa Dlamini",
    equipmentType: "Harvester",
    description: "Combine harvester suitable for grain crops",
    availability: "September-October",
    status: "Booked",
    location: "KwaZulu-Natal",
    pricePerDay: "R1500",
    images: ["https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"]
  }
];

// AI Recommendations Mock Data
export const mockRecommendations = {
  marketplace: [
    {
      type: "buyer_match",
      title: "High-demand buyer found",
      description: "Restaurant chain looking for organic tomatoes in your area",
      confidence: 92,
      action: "Contact buyer"
    },
    {
      type: "price_alert",
      title: "Price increase predicted",
      description: "Tomato prices expected to rise 15% next month",
      confidence: 78,
      action: "Adjust pricing"
    }
  ],
  mentorship: [
    {
      type: "mentor_suggestion",
      title: "Perfect mentor match",
      description: "Expert in organic farming available for mentorship",
      confidence: 88,
      action: "Send request"
    }
  ],
  forum: [
    {
      type: "trending_topic",
      title: "Trending discussion",
      description: "Drought management techniques - join the conversation",
      confidence: 85,
      action: "Join discussion"
    }
  ]
};

// Categories and filters
export const categories = [
  "All Categories",
  "Vegetables",
  "Grains",
  "Fruits",
  "Root Vegetables",
  "Herbs",
  "Livestock"
];

export const locations = [
  "All Locations",
  "Gauteng",
  "KwaZulu-Natal",
  "Western Cape",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape"
];

export const forumCategories = [
  "All Topics",
  "Crop Management",
  "Sustainability",
  "Technology",
  "Business",
  "Equipment",
  "Weather",
  "Market Prices"
];