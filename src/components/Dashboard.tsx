
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import DashboardContent from './DashboardContent';
import ExpenseManager from './ExpenseManager';
import Reports from './Reports';
import Profile from './Profile';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
