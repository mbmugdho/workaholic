import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, themes } = useTheme();
  const isDark = theme === themes.dark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-sm btn-ghost"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? "Dark: Dracula" : "Light: Nord"}
    </button>
  );
}