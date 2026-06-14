import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

interface SettingsContextValue {
  theme: Theme;
  areRipplesEnabled: boolean;
  toggleTheme: () => void;
  toggleRipples: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  theme: "light",
  areRipplesEnabled: true,
  toggleTheme: () => {},
  toggleRipples: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [areRipplesEnabled, setAreRipplesEnabled] = useState(true);
  
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
  const toggleRipples = () => setAreRipplesEnabled(e => !e);

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, areRipplesEnabled, toggleRipples }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
