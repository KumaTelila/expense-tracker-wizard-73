import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Layout = 'default' | 'compact' | 'minimal';
type SidebarPosition = 'left' | 'right';
type HeaderPosition = 'top' | 'hidden';

interface CustomTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  sidebarPosition: SidebarPosition;
  setSidebarPosition: (position: SidebarPosition) => void;
  headerPosition: HeaderPosition;
  setHeaderPosition: (position: HeaderPosition) => void;
  customTheme: CustomTheme | null;
  setCustomTheme: (theme: CustomTheme | null) => void;
  isDark: boolean;
}

const defaultCustomThemes: CustomTheme[] = [
  {
    id: 'ocean',
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#3b82f6',
    background: '#f8fafc',
    foreground: '#0f172a'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    background: '#f0fdf4',
    foreground: '#064e3b'
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#fb923c',
    background: '#fffbeb',
    foreground: '#9a3412'
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem('layout');
    return (saved as Layout) || 'default';
  });

  const [sidebarPosition, setSidebarPosition] = useState<SidebarPosition>(() => {
    const saved = localStorage.getItem('sidebarPosition');
    return (saved as SidebarPosition) || 'left';
  });

  const [headerPosition, setHeaderPosition] = useState<HeaderPosition>(() => {
    const saved = localStorage.getItem('headerPosition');
    return (saved as HeaderPosition) || 'top';
  });

  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(() => {
    const saved = localStorage.getItem('customTheme');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('layout', layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('sidebarPosition', sidebarPosition);
  }, [sidebarPosition]);

  useEffect(() => {
    localStorage.setItem('headerPosition', headerPosition);
  }, [headerPosition]);

  useEffect(() => {
    if (customTheme) {
      localStorage.setItem('customTheme', JSON.stringify(customTheme));
      const root = window.document.documentElement;
      root.style.setProperty('--primary', customTheme.primary);
      root.style.setProperty('--secondary', customTheme.secondary);
      root.style.setProperty('--accent', customTheme.accent);
    } else {
      localStorage.removeItem('customTheme');
    }
  }, [customTheme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      layout,
      setLayout,
      sidebarPosition,
      setSidebarPosition,
      headerPosition,
      setHeaderPosition,
      customTheme,
      setCustomTheme,
      isDark
    }}>
      {children}
      {defaultCustomThemes.map(t => (
        <style key={t.id} />
      ))}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const customThemes = defaultCustomThemes;
