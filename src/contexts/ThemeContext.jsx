import React, { createContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext(null)

const THEME_KEY = 'workaholic-theme'
const LIGHT = 'nord'
const DARK = 'dracula'

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === LIGHT || saved === DARK) return saved

  // Optional: system preference fallback
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDark ? DARK : LIGHT
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    // Remove any accidental theme overrides (these will block html theme switching)
    document.body.removeAttribute('data-theme')
    const root = document.getElementById('root')
    if (root) root.removeAttribute('data-theme')

    // Apply DaisyUI theme to <html>
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)

    // Optional: helps browser form controls match dark/light
    document.documentElement.style.colorScheme =
      theme === DARK ? 'dark' : 'light'
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === LIGHT ? DARK : LIGHT))
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      themes: { light: LIGHT, dark: DARK },
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
