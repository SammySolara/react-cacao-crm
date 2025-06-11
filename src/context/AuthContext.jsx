import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext({})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async (email) => {
    try {
      console.log('🔍 Searching for user with email:', email)
      
      // Try exact match first
      const { data: exactMatch, error: exactError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (exactError) {
        console.log('⚠️ Exact match failed:', exactError)
        
        // Try case-insensitive search
        console.log('🔍 Trying case-insensitive search...')
        const { data: caseInsensitive, error: caseError } = await supabase
          .from('users')
          .select('*')
          .ilike('email', email)
          .single()

        if (caseError) {
          console.error('❌ Case-insensitive search also failed:', caseError)
          return null
        } else {
          console.log('✅ Found user with case-insensitive search:', caseInsensitive)
          return caseInsensitive
        }
      } else {
        console.log('✅ Found user with exact match:', exactMatch)
        return exactMatch
      }
    } catch (error) {
      console.error('💥 User data fetch error:', error)
      return null
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: error.message }
    }
  }

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, error: error.message }
    }
  }

  const updateUserData = async (updates) => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('email', user.email)
        .select()
        .single()

      if (error) throw error

      setUserData({ ...userData, ...data })
      return { success: true, data }
    } catch (error) {
      console.error('Update user data error:', error)
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        fetchUserData(session.user.email).then(data => {
          setUserData(data)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)

      if (event === 'SIGNED_IN' && session) {
        setUser(session.user)
        const data = await fetchUserData(session.user.email)
        setUserData(data)
        
        if (!data) {
          console.error('❌ No user data found in public.users table for email:', session.user.email)
          alert(`User profile not found in database for email: ${session.user.email}. Contact administrator.`)
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUserData(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    userData,
    loading,
    signIn,
    signOut,
    resetPassword,
    updateUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}