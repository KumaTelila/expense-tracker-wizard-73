
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AppHeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'expenses', title: 'Expenses' },
  { id: 'reports', title: 'Reports' },
  { id: 'profile', title: 'Profile' },
];

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  const { headerPosition } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (headerPosition === 'hidden') return null;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Desktop Sidebar Toggle */}
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full bg-white dark:bg-gray-900">
                {/* Mobile Menu Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                      ExpenseTracker
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeView === item.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setActiveView(item.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Title */}
        <div className="flex-1 text-center md:text-left md:ml-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
            {activeView}
          </h1>
        </div>
      </div>
    </header>
  );
}
