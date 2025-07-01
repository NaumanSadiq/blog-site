import { Sun, Sunset, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, Theme } from "@/hooks/use-theme";

const themes = [
  {
    name: "morning",
    label: "Morning",
    icon: Sun,
    description: "Fresh & Bright",
  },
  {
    name: "evening",
    label: "Evening",
    icon: Sunset,
    description: "Warm & Golden",
  },
  {
    name: "night",
    label: "Night",
    icon: Moon,
    description: "Dark & Cool",
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find((t) => t.name === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="theme-switcher-button relative overflow-hidden"
        >
          <CurrentIcon className="h-4 w-4 transition-all duration-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="theme-dropdown">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name as Theme)}
              className={`cursor-pointer transition-all duration-200 ${
                theme === themeOption.name ? "theme-active" : ""
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{themeOption.label}</span>
                <span className="text-xs opacity-70">
                  {themeOption.description}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
