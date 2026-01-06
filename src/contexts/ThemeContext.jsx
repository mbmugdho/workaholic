import React, { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

const THEME_KEY = "workaholic-theme";
const LIGHT = "nord";
const DARK = "dracula";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === LIGHT || saved === DARK) return saved;

  // Optional: system preference fallback
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? DARK : LIGHT;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // DaisyUI theme switching: set on <html>
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === LIGHT ? DARK : LIGHT));
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      themes: { light: LIGHT, dark: DARK },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}