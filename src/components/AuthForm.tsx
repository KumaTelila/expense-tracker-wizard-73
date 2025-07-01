
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, DollarSign, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store token and redirect
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({
        name: formData.name || 'Demo User',
        email: formData.email
      }));
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've been logged in successfully." : "Your account has been created successfully.",
      });
      
      // Reload to trigger authentication check
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left side - Features showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold">ExpenseTracker</h1>
            </div>
            <p className="text-xl text-blue-100 mb-12">
              Take control of your finances with intelligent expense tracking and insightful analytics.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Analytics</h3>
                <p className="text-blue-100 text-sm">Get detailed insights into your spending patterns and trends.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <PieChart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Category Management</h3>
                <p className="text-blue-100 text-sm">Organize expenses with custom categories and tags.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Visual Reports</h3>
                <p className="text-blue-100 text-sm">Beautiful charts and graphs to visualize your financial health.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="p-3 bg-blue-600 text-white rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
            </div>
          </div>

          <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="h-12 pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Signing in...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Create account</CardTitle>
                  <CardDescription>Get started with your expense tracking journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="h-12 pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
