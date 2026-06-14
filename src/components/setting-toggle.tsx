import { Bubbles, Moon, Sun } from "lucide-react";
import { useSettings } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme, areRipplesEnabled, toggleRipples } = useSettings();

  return (
    <div 
      className="fixed top-3 right-3 z-50 flex flex-col md:flex-row items-center gap-2"
    >
      <button
        onClick={toggleRipples}
        className="z-50 p-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm text-foreground hover:text-foreground hover:scale-[1.08] active:scale-[0.92] transition-all duration-200 cursor-pointer"
        aria-label="Toggle theme"
      >
        {areRipplesEnabled ? (
          <Bubbles className="h-4 w-4" />
        ) : (
          <Bubbles className="h-4 w-4 opacity-50" />
        )}
      </button>

      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm text-foreground hover:text-foreground hover:scale-[1.08] active:scale-[0.92] transition-all duration-200 cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
