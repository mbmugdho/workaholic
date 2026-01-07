import React, { createContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import toast from 'react-hot-toast'

import { auth } from '../firebase/firebase.config'
import { exchangeFirebaseToken } from '../services/authService'
import { fetchMyProfile } from '../services/userService'

export const AuthContext = createContext(null)

const TOKEN_KEY = 'access-token'

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncWithServer = async ({ role } = {}) => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    try {
      const idToken = await currentUser.getIdToken(true)
      const data = await exchangeFirebaseToken({ idToken, role })

      if (data?.token) localStorage.setItem(TOKEN_KEY, data.token)
      if (data?.user) setDbUser(data.user)

      return data
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Server auth exchange failed'
      toast.error(msg)
      throw err
    }
  }

  // ✅ define this BEFORE useMemo
  const refreshUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    const data = await fetchMyProfile()
    if (data?.user) setDbUser(data.user)
    return data
  }

  const register = async ({ name, email, password, photoURL, role }) => {
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(cred.user, {
        displayName: name,
        photoURL: photoURL || '',
      })

      await syncWithServer({ role })

      toast.success('Account created successfully')
      return cred.user
    } catch (err) {
      const code = err?.code

      if (code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login instead.')
      } else if (code === 'auth/weak-password') {
        toast.error('Password is too weak. Use a stronger password.')
      } else if (code === 'auth/invalid-email') {
        toast.error('Invalid email address.')
      } else {
        toast.error(err?.message || 'Registration failed')
      }

      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      await syncWithServer()
      toast.success('Logged in')
      return cred.user
    } catch (err) {
      const code = err?.code

      if (code === 'auth/invalid-credential') {
        toast.error('Invalid email or password.')
      } else {
        toast.error(err?.message || 'Login failed')
      }

      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async ({ role } = {}) => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(auth, provider)
      await syncWithServer({ role })
      toast.success('Logged in with Google')
      return cred.user
    } catch (err) {
      toast.error(err?.message || 'Google sign-in failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      localStorage.removeItem(TOKEN_KEY)
      setDbUser(null)
      toast.success('Logged out')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user)

      if (user) {
        try {
          await syncWithServer()
        } catch {
          localStorage.removeItem(TOKEN_KEY)
        }
      } else {
        localStorage.removeItem(TOKEN_KEY)
        setDbUser(null)
      }

      setLoading(false)
    })

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      firebaseUser,
      user: dbUser,
      loading,
      register,
      login,
      loginWithGoogle,
      logout,
      refreshUser,
      token: localStorage.getItem(TOKEN_KEY),
    }),
    [firebaseUser, dbUser, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
