import React from 'react'

function DashboardContent({ stats, recentDeals, loading }) {
  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'badge bg-success',
      'In Progress': 'badge bg-warning',
      'Pending': 'badge bg-secondary'
    }
    return statusClasses[status] || 'badge bg-primary'
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon deals">
            <i className="fas fa-handshake"></i>
          </div>
          <h3 className="stat-value">{loading ? '...' : stats.totalDeals}</h3>
          <p className="stat-label">Active Deals</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon clients">
            <i className="fas fa-users"></i>
          </div>
          <h3 className="stat-value">{loading ? '...' : stats.totalClients}</h3>
          <p className="stat-label">Total Clients</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <h3 className="stat-value">{loading ? '...' : stats.totalRevenue}</h3>
          <p className="stat-label">Monthly Revenue</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon tasks">
            <i className="fas fa-tasks"></i>
          </div>
          <h3 className="stat-value">{loading ? '...' : stats.pendingTasks}</h3>
          <p className="stat-label">Pending Tasks</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Recent Deals</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        Loading deals...
                      </td>
                    </tr>
                  ) : recentDeals.length > 0 ? (
                    recentDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td>{deal.client}</td>
                        <td>{deal.value}</td>
                        <td>
                          <span className={getStatusBadge(deal.status)}>
                            {deal.status}
                          </span>
                        </td>
                        <td>{deal.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No deals found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Quick Actions</h5>
          </div>
          <div className="card-body">
            <div className="d-grid gap-3">
              <button className="btn btn-outline-primary rounded-3">
                <i className="fas fa-plus me-2"></i>
                Add New Deal
              </button>
              <button className="btn btn-outline-success rounded-3">
                <i className="fas fa-user-plus me-2"></i>
                Add New Client
              </button>
              <button className="btn btn-outline-info rounded-3">
                <i className="fas fa-calendar-plus me-2"></i>
                Schedule Meeting
              </button>
              <button className="btn btn-outline-warning rounded-3">
                <i className="fas fa-chart-line me-2"></i>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent