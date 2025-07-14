import { supabase } from '../lib/supabase'

// User operations
export const userService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
    return { data, error }
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Marketplace operations
export const marketplaceService = {
  async getListings(filters = {}) {
    let query = supabase
      .from('marketplace_listings')
      .select(`
        *,
        farmer:profiles!farmer_id(name, location, avatar_url)
      `)
      .eq('status', 'Available')
      .order('created_at', { ascending: false })

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters.productType) {
      query = query.ilike('product_type', `%${filters.productType}%`)
    }
    if (filters.search) {
      query = query.or(`product_type.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createListing(listingData) {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .insert([listingData])
      .select()
    return { data, error }
  },

  async updateListing(listingId, updates) {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', listingId)
      .select()
    return { data, error }
  },

  async deleteListing(listingId) {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .delete()
      .eq('id', listingId)
    return { data, error }
  }
}

// Forum operations
export const forumService = {
  async getPosts(topic = null) {
    let query = supabase
      .from('forum_posts')
      .select(`
        *,
        author:profiles!author_id(name, avatar_url)
      `)
      .order('created_at', { ascending: false })

    if (topic && topic !== 'All') {
      query = query.eq('topic', topic)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createPost(postData) {
    const { data, error } = await supabase
      .from('forum_posts')
      .insert([postData])
      .select(`
        *,
        author:profiles!author_id(name, avatar_url)
      `)
    return { data, error }
  },

  async votePost(postId, increment = 1) {
    const { data, error } = await supabase
      .rpc('increment_post_votes', { 
        post_id: postId, 
        increment_value: increment 
      })
    return { data, error }
  },

  async updateRepliesCount(postId, increment = 1) {
    const { data, error } = await supabase
      .rpc('increment_replies_count', { 
        post_id: postId, 
        increment_value: increment 
      })
    return { data, error }
  }
}

// Mentorship operations
export const mentorshipService = {
  async getMentorships(userId) {
    const { data, error } = await supabase
      .from('mentorship_connections')
      .select(`
        *,
        mentor:profiles!mentor_id(name, avatar_url, farming_type, location),
        mentee:profiles!mentee_id(name, avatar_url, farming_type, location)
      `)
      .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getAvailableMentors(currentUserId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('user_id', currentUserId)
      .not('badges', 'is', null)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async requestMentorship(mentorId, menteeId, focus) {
    const { data, error } = await supabase
      .from('mentorship_connections')
      .insert([{
        mentor_id: mentorId,
        mentee_id: menteeId,
        focus,
        status: 'Pending'
      }])
      .select(`
        *,
        mentor:profiles!mentor_id(name, avatar_url, farming_type),
        mentee:profiles!mentee_id(name, avatar_url, farming_type)
      `)
    return { data, error }
  },

  async updateMentorshipStatus(connectionId, status) {
    const { data, error } = await supabase
      .from('mentorship_connections')
      .update({ 
        status,
        updated_at: new Date().toISOString(),
        ...(status === 'Active' && { start_date: new Date().toISOString().split('T')[0] })
      })
      .eq('id', connectionId)
      .select()
    return { data, error }
  },

  async updateProgress(connectionId, progress) {
    const { data, error } = await supabase
      .from('mentorship_connections')
      .update({ 
        progress,
        updated_at: new Date().toISOString(),
      })
      .eq('id', connectionId)
      .select()
    return { data, error }
  }
}

// Equipment sharing operations
export const equipmentService = {
  async getEquipment(filters = {}) {
    let query = supabase
      .from('equipment_sharing')
      .select(`
        *,
        owner:profiles!owner_id(name, location, avatar_url)
      `)
      .eq('status', 'Available')
      .order('created_at', { ascending: false })

    if (filters.equipmentType) {
      query = query.ilike('equipment_type', `%${filters.equipmentType}%`)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createEquipmentListing(equipmentData) {
    const { data, error } = await supabase
      .from('equipment_sharing')
      .insert([equipmentData])
      .select(`
        *,
        owner:profiles!owner_id(name, location, avatar_url)
      `)
    return { data, error }
  },

  async requestEquipment(equipmentId, requesterId) {
    const { data, error } = await supabase
      .from('equipment_sharing')
      .update({
        requester_id: requesterId,
        status: 'Requested',
        updated_at: new Date().toISOString(),
      })
      .eq('id', equipmentId)
      .select()
    return { data, error }
  }
}