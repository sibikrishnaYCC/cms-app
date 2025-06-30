// src/Authentication/useAuthStatus.js
import { useEffect, useState } from 'react'
import baseurl from '../../base.js'

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${baseurl}/auth/authcheck`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setIsAuthenticated(data.success)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  return isAuthenticated
}

export default useAuthStatus