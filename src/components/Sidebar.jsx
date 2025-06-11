import React from 'react'
import { useAuth } from '../context/AuthContext'

function Sidebar({ activeSection, onSectionChange, collapsed }) {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    const result = await signOut()
    if (!result.success) {
      alert('Error logging out: ' + result.error)
    }
  }

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { id: 'deals', icon: 'fas fa-handshake', label: 'Deals' },
    { id: 'clients', icon: 'fas fa-users', label: 'Clients' },
    { id: 'tasks', icon: 'fas fa-tasks', label: 'Tasks' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
  ]

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fa-solid fa-cookie-bite"></i>
        </div>
        {!collapsed && <h4 className="brand-name">Cacao CRM</h4>}
      </div>
      
      <div className="nav-menu">
        {navItems.map((item) => (
          <div key={item.id} className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                onSectionChange(item.id)
              }}
            >
              <i className={item.icon}></i>
              {!collapsed && item.label}
            </a>
          </div>
        ))}
        
        <div className="nav-item mt-4">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleLogout()
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            {!collapsed && 'Logout'}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar