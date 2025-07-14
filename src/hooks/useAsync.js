import { useState, useEffect } from 'react'

export const useAsync = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const execute = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await asyncFunction()
        if (isMounted) {
          setData(result.data)
          if (result.error) {
            setError(result.error)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    execute()

    return () => {
      isMounted = false
    }
  }, dependencies)

  const refetch = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFunction()
      setData(result.data)
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}