
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import DashboardContent from './DashboardContent';
import ExpenseManager from './ExpenseManager';
import Reports from './Reports';
import Profile from './Profile';
import { FloatingSettings } from './FloatingSettings';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function DashboardInner() {
  const [activeView, setActiveView] = useState('dashboard');
  const { layout, sidebarPosition, headerPosition } = useTheme();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'expenses':
        return <ExpenseManager />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardContent />;
    }
  };

  const layoutClasses = {
    default: 'min-h-screen',
    compact: 'min-h-screen text-sm',
    minimal: 'min-h-screen space-y-2'
  };

  const sidebarOrder = sidebarPosition === 'right' ? 'order-2' : 'order-1';
  const mainOrder = sidebarPosition === 'right' ? 'order-1' : 'order-2';

  return (
    <SidebarProvider>
      <div className={`flex w-full bg-gray-50 dark:bg-gray-950 ${layoutClasses[layout]}`}>
        {/* Sidebar */}
        <div className={`${sidebarOrder} hidden md:block`}>
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        </div>

        {/* Main Content Area */}
        <div className={`flex flex-col flex-1 ${mainOrder}`}>
          {/* Header */}
          {headerPosition === 'top' && (
            <AppHeader activeView={activeView} setActiveView={setActiveView} />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            {renderContent()}
          </main>
        </div>

        {/* Floating Settings Button */}
        <FloatingSettings />
      </div>
    </SidebarProvider>
  );
}

const Dashboard = () => {
  return (
    <ThemeProvider>
      <DashboardInner />
    </ThemeProvider>
  );
};

export default Dashboard;
