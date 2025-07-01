import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "morning" | "evening" | "night";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("devblog-theme") as Theme;
      return stored || "night";
    }
    return "night";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("morning", "evening", "night");
    root.classList.add(theme);
    localStorage.setItem("devblog-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
