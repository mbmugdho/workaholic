import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../firebase/firebase.config";
import { exchangeFirebaseToken } from "../services/authService";

export const AuthContext = createContext(null);

const TOKEN_KEY = "access-token";

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); // {email, role, coins, ...}
  const [loading, setLoading] = useState(true);

  // exchange + save server token
  const syncWithServer = async ({ role } = {}) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const idToken = await currentUser.getIdToken(true);
    const data = await exchangeFirebaseToken({ idToken, role });

    if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
    if (data?.user) setDbUser(data.user);
  };

  // Email/pass register
  const register = async ({ name, email, password, photoURL, role }) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // update Firebase profile (displayName/photoURL)
      await updateProfile(cred.user, {
        displayName: name,
        photoURL: photoURL || "",
      });

      // exchange token with role (role only matters on first creation)
      await syncWithServer({ role });

      toast.success("Account created successfully");
      return cred.user;
    } catch (err) {
      toast.error(err?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Email/pass login
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await syncWithServer(); // no role needed
      toast.success("Logged in");
      return cred.user;
    } catch (err) {
      toast.error(err?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login (optionally pass role if user is brand new)
  const loginWithGoogle = async ({ role } = {}) => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await syncWithServer({ role }); // role applied only if new user on server
      toast.success("Logged in with Google");
      return cred.user;
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem(TOKEN_KEY);
      setDbUser(null);
      toast.success("Logged out");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      // If user exists, always refresh server token + dbUser.
      // This is what prevents redirect-to-login after refresh.
      if (user) {
        try {
          await syncWithServer();
        } catch (e) {
          // If exchange fails, clear server token but keep firebaseUser
          localStorage.removeItem(TOKEN_KEY);
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setDbUser(null);
      }

      setLoading(false);
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      firebaseUser,
      user: dbUser, // use this across app for role/coins
      loading,
      register,
      login,
      loginWithGoogle,
      logout,
      token: localStorage.getItem(TOKEN_KEY),
    }),
    [firebaseUser, dbUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}