'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLight: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // Start with dark as default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      // Check localStorage first
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
        updateTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        setTheme(systemTheme);
        updateTheme(systemTheme);
      }
    } catch (error) {
      // Fallback to dark theme if localStorage fails
      console.warn('Theme initialization failed, falling back to dark theme:', error);
      setTheme('dark');
      updateTheme('dark');
    }
  }, []);

  const updateTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(newTheme);
    
    // Update CSS custom properties
    if (newTheme === 'dark') {
      root.style.setProperty('--background', '#0f172a');
      root.style.setProperty('--foreground', '#f8fafc');
      root.style.setProperty('--card', '#1e293b');
      root.style.setProperty('--card-foreground', '#f8fafc');
      root.style.setProperty('--border', '#334155');
      root.style.setProperty('--muted', '#475569');
      root.style.setProperty('--muted-foreground', '#94a3b8');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#1e293b'); // Darker text
      root.style.setProperty('--card', '#f8fafc');
      root.style.setProperty('--card-foreground', '#1e293b'); // Darker card text
      root.style.setProperty('--border', '#e2e8f0');
      root.style.setProperty('--muted', '#f1f5f9');
      root.style.setProperty('--muted-foreground', '#475569'); // Darker muted text
    }
  };

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateTheme(newTheme);
      console.log('Theme toggled to:', newTheme); // Debug log
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value = {
    theme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values instead of throwing during development
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
      isLight: false,
      isDark: true
    };
  }
  return context;
}