import './App.css'
import React, { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { useContext } from 'react'
import { AuthContext } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'

import BASE_URL from './utils/config'

const App = () => {
  const [user, setUser] = useState("")
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData, fetchUserData] = useContext(AuthContext)

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.role);
        setLoggedInUserData(data.data);
        localStorage.setItem('loggedInUser', JSON.stringify({
          role: data.role,
          data: data.data,
          token: data.token
        }));
        await fetchUserData(); // Refresh employee list to ensure it's up to date
        return { success: true };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: 'Server connection failed. Please check if server is running.' };
    }
  }

  const renderDashboard = () => {
    if (!user) return <Login handleLogin={handleLogin} />
    if (user === "admin") return <AdminDashboard changeUser={setUser} />
    if (user === "employee") return <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
    return null
  }

  return (
    <div className='bg-[#0a0a0a] min-h-screen'>
      <Toaster />
      {renderDashboard()}
    </div>
  )
}

export default App