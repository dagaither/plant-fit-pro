import { useState, useEffect } from 'react'
import  { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const contextObj = {
  }

  return (
    <>
    <NavBar />
    <div className="mainContent" style={{paddingTop: "6rem"}}>
    <Outlet context={contextObj}/>
    </div>
    </>
  )
}

export default App
