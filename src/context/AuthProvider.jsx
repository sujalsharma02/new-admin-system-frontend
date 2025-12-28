import React, { createContext, useEffect, useState, useCallback } from 'react'
import BASE_URL from '../utils/config'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const updateUserData = useCallback((newData) => {
    setUserData(newData)
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/employees`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <AuthContext.Provider value={[userData, updateUserData, fetchUserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider