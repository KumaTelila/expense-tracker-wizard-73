
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
  const { collapsed } = useSidebar();
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

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible>
      <SidebarContent className="bg-white border-r border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
              <DollarSign className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-gray-900">ExpenseTracker</h2>
              </div>
            )}
          </div>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                <p className="text-sm text-gray-500 truncate">{user.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    className={`w-full ${
                      activeView === item.id 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom actions */}
        <div className="mt-auto p-4 border-t border-gray-200 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-50"
            onClick={() => setActiveView('settings')}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>

      <SidebarTrigger className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 shadow-sm" />
    </Sidebar>
  );
}
