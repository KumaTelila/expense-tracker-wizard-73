
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Lock, Bell, Shield, CreditCard, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    joinDate: '',
    totalExpenses: 0,
    monthlyBudget: 1500
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    weeklyReports: false,
    expenseReminders: true
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const profileData = {
      name: userData.name || 'John Doe',
      email: userData.email || 'john@example.com',
      joinDate: 'January 2024',
      totalExpenses: 1250.49,
      monthlyBudget: 1500
    };
    setUser(profileData);
    setFormData({
      name: profileData.name,
      email: profileData.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update localStorage
    const updatedUser = {
      name: formData.name,
      email: formData.email
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email
    }));

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });

    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const stats = [
    { label: 'Total Expenses', value: `$${user.totalExpenses.toFixed(2)}`, icon: CreditCard },
    { label: 'Monthly Budget', value: `$${user.monthlyBudget.toFixed(2)}`, icon: Target },
    { label: 'Member Since', value: user.joinDate, icon: User },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and preferences.</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <Badge variant="secondary" className="mt-2">Premium Member</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Budget Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified when approaching budget limits</p>
                    </div>
                    <Switch
                      checked={notifications.budgetAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('budgetAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                      <p className="text-sm text-gray-600">Receive weekly spending summaries</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Expense Reminders</h4>
                      <p className="text-sm text-gray-600">Reminders to log daily expenses</p>
                    </div>
                    <Switch
                      checked={notifications.expenseReminders}
                      onCheckedChange={(checked) => handleNotificationChange('expenseReminders', checked)}
                    />
                  </div>
                </div>
                
                <Button 
                  className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => toast({
                    title: "Settings Saved",
                    description: "Your notification preferences have been updated.",
                  })}
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
