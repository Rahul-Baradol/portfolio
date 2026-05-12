import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always "light" on first render so SSR HTML and client hydration match.
  const [theme, setTheme] = useState<Theme>("light");
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      // First run after hydration: read stored preference.
      // The inline <script> in index.html already applied the dark class to <html>,
      // so we only need to sync React state — no DOM write, no localStorage overwrite.
      isMounted.current = true;
      const stored = (localStorage.getItem("theme") as Theme) || "light";
      if (stored !== "light") setTheme(stored);
      return;
    }

    // Every subsequent run is a user-initiated toggle.
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
