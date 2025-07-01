
import { DollarSign, Home, Receipt, BarChart3, User, LogOut, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { id: 'dashboard', title: 'Dashboard', icon: Home },
  { id: 'expenses', title: 'Expenses', icon: Receipt },
  { id: 'reports', title: 'Reports', icon: BarChart3 },
  { id: 'profile', title: 'Profile', icon: User },
];

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { state, isMobile } = useSidebar();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
              <DollarSign className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">ExpenseTracker</h2>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.id)}
                      className={`w-full ${
                        activeView === item.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* User info at bottom */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{user.name || 'User'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email || 'user@example.com'}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
