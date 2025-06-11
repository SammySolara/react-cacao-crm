import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn(email, password)
      
      if (result.success) {
        console.log('✅ Login successful')
        // Navigation will be handled by the AuthContext and App component
      } else {
        console.error('❌ Login failed:', result.error)
        alert('Login failed: ' + result.error)
      }
    } catch (error) {
      console.error('💥 Login error:', error)
      alert('An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    
    if (!email) {
      alert('Please enter your email address first.')
      return
    }
    
    const result = await resetPassword(email)
    if (result.success) {
      alert('Password reset email sent! Check your inbox.')
    } else {
      alert('Error sending reset email: ' + result.error)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo">
            <i className="fa-solid fa-cookie-bite"></i>
          </div>
          <div className="brand-name">Cacao CRM</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-login" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing In...
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login