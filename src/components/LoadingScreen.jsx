import React from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="logo">
        <i className="fa-solid fa-cookie-bite"></i>
      </div>
      <div className="loading-text">Loading Sweet Chocolate...</div>
      <div className="spinner"></div>
    </div>
  )
}

export default LoadingScreen