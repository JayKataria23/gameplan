import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Theme {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  decorativeEmoji: string;
}

interface ThemeSelectorProps {
  themes: Record<string, Theme>;
  selectedTheme: string;
  onSelect: (theme: string) => void;
}

export default function ThemeSelector({
  themes,
  selectedTheme,
  onSelect,
}: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Object.entries(themes).map(([themeName, theme]) => (
        <button
          key={themeName}
          onClick={() => onSelect(themeName)}
          className={cn(
            "group relative h-24 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg",
            selectedTheme === themeName
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:ring-1 hover:ring-primary/50 hover:ring-offset-1"
          )}
          style={{
            backgroundColor: theme.backgroundColor,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <span
              className="text-3xl mb-1 transform transition-transform group-hover:scale-110"
              style={{ color: theme.textColor }}
            >
              {theme.decorativeEmoji}
            </span>
            <span
              className="text-sm font-medium  max-w-full px-2"
              style={{
                color: theme.textColor,
                fontFamily: theme.fontFamily,
              }}
            >
              {themeName}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
