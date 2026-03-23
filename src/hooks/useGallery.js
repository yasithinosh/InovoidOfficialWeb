import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useGallery(category = null) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      let query = supabase.from('gallery').select('*').order('created_at', { ascending: false })
      if (category) query = query.eq('category', category)
      const { data, error } = await query
      if (!error) setItems(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [category])

  return { items, loading }
}
