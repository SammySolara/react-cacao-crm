import React from 'react'

function TopNavbar({ pageTitle, userData, onToggleSidebar }) {
  const getInitials = (name) => {
    if (!name) return 'JD'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getUserName = () => {
    if (userData?.name) return userData.name
    if (userData?.email) return userData.email.split('@')[0]
    return 'User'
  }

  return (
    <nav className="top-navbar">
      <div className="d-flex align-items-center">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h5 className="mb-0">{pageTitle}</h5>
      </div>
      
      <div className="user-info">
        <div className="user-avatar">
          {getInitials(userData?.name)}
        </div>
        <div className="user-details">
          <h6>{getUserName()}</h6>
          <small>{userData?.role || 'Admin'}</small>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar