import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import DashboardContent from './DashboardContent'
import ClientManagement from './ClientManagement'
import './Dashboard.css'

function Dashboard() {
  const { userData } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [stats, setStats] = useState({
    totalDeals: 0,
    totalClients: 0,
    totalRevenue: '$0',
    pendingTasks: 0
  })
  const [recentDeals, setRecentDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalDeals: 24,
        totalClients: 156,
        totalRevenue: '$45,230',
        pendingTasks: 8
      })
      
      setRecentDeals([
        {
          id: 1,
          client: 'Acme Corp',
          value: '$12,500',
          status: 'In Progress',
          date: '2024-01-15'
        },
        {
          id: 2,
          client: 'Tech Solutions',
          value: '$8,750',
          status: 'Completed',
          date: '2024-01-14'
        },
        {
          id: 3,
          client: 'Global Industries',
          value: '$22,100',
          status: 'Pending',
          date: '2024-01-13'
        }
      ])
      
      setLoading(false)
    }, 1500)
  }, [])

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const getSectionTitle = (section) => {
    const titles = {
      dashboard: 'Dashboard',
      deals: 'Deals',
      clients: 'Clients',
      tasks: 'Tasks',
      reports: 'Reports',
      settings: 'Settings'
    }
    return titles[section] || 'Dashboard'
  }

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardContent
            stats={stats}
            recentDeals={recentDeals}
            loading={loading}
          />
        )
      
      case 'clients':
        return <ClientManagement />
      
      default:
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">{getSectionTitle(activeSection)}</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">This section is under development.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={sidebarCollapsed}
      />
      
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <TopNavbar
          pageTitle={getSectionTitle(activeSection)}
          userData={userData}
          onToggleSidebar={toggleSidebar}
        />
        
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard