import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useRealtimeSubscription = (table, filters = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      let query = supabase.from(table).select('*')
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          query = query.eq(key, value)
        }
      })

      const { data: initialData, error } = await query
      if (!error && initialData) {
        setData(initialData)
      }
      setLoading(false)
    }

    fetchInitialData()

    // Set up real-time subscription
    const subscription = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData(prev => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setData(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new : item
            ))
          } else if (payload.eventType === 'DELETE') {
            setData(prev => prev.filter(item => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, JSON.stringify(filters)])

  return { data, loading }
}