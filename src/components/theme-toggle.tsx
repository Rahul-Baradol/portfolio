import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </motion.button>
  );
}
