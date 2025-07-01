
import { useState } from 'react';
import { Settings, Palette, Layout, Monitor, Sun, Moon, Sidebar, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useTheme, customThemes } from '@/contexts/ThemeContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function FloatingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const {
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
  } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Customize Layout & Theme
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Palette className="h-4 w-4" />
              Theme
            </h3>
            
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={(value) => value && setTheme(value as any)}
              className="grid grid-cols-3 gap-2"
            >
              <ToggleGroupItem value="light" className="flex flex-col gap-1 p-3">
                <Sun className="h-4 w-4" />
                <span className="text-xs">Light</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex flex-col gap-1 p-3">
                <Moon className="h-4 w-4" />
                <span className="text-xs">Dark</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="system" className="flex flex-col gap-1 p-3">
                <Monitor className="h-4 w-4" />
                <span className="text-xs">System</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Custom Themes */}
          <div className="space-y-3">
            <h3 className="font-medium">Custom Themes</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={!customTheme ? "default" : "outline"}
                size="sm"
                onClick={() => setCustomTheme(null)}
                className="h-auto p-3"
              >
                Default
              </Button>
              {customThemes.map((theme) => (
                <Button
                  key={theme.id}
                  variant={customTheme?.id === theme.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCustomTheme(theme)}
                  className="h-auto p-3"
                  style={{
                    backgroundColor: customTheme?.id === theme.id ? theme.primary : undefined,
                    borderColor: theme.primary
                  }}
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Layout Settings */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Layout className="h-4 w-4" />
              Layout Style
            </h3>
            
            <ToggleGroup
              type="single"
              value={layout}
              onValueChange={(value) => value && setLayout(value as any)}
              className="grid grid-cols-3 gap-2"
            >
              <ToggleGroupItem value="default" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Default</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="compact" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Compact</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="minimal" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Minimal</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Sidebar Position */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Sidebar className="h-4 w-4" />
              Sidebar Position
            </h3>
            
            <ToggleGroup
              type="single"
              value={sidebarPosition}
              onValueChange={(value) => value && setSidebarPosition(value as any)}
              className="grid grid-cols-2 gap-2"
            >
              <ToggleGroupItem value="left" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Left</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="right" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Right</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Header Position */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Navigation className="h-4 w-4" />
              Header Position
            </h3>
            
            <ToggleGroup
              type="single"
              value={headerPosition}
              onValueChange={(value) => value && setHeaderPosition(value as any)}
              className="grid grid-cols-2 gap-2"
            >
              <ToggleGroupItem value="top" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Top</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="hidden" className="flex flex-col gap-1 p-3">
                <span className="text-xs">Hidden</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
