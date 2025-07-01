
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Receipt, Plus, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const DashboardContent = () => {
  const { isDark } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    averageDaily: 0,
    transactionCount: 0
  });

  useEffect(() => {
    // Generate demo data
    const demoExpenses = [
      { id: 1, amount: 45.50, category: 'Food', date: '2024-07-01', description: 'Lunch at restaurant' },
      { id: 2, amount: 120.00, category: 'Transportation', date: '2024-06-30', description: 'Gas fill-up' },
      { id: 3, amount: 89.99, category: 'Shopping', date: '2024-06-29', description: 'Online shopping' },
      { id: 4, amount: 25.00, category: 'Food', date: '2024-06-28', description: 'Coffee and breakfast' },
      { id: 5, amount: 150.00, category: 'Utilities', date: '2024-06-27', description: 'Electric bill' },
    ];

    setExpenses(demoExpenses);
    setStats({
      totalExpenses: 1250.49,
      monthlyExpenses: 430.49,
      averageDaily: 14.35,
      transactionCount: 38
    });
  }, []);

  const chartData = [
    { name: 'Jan', amount: 1200 },
    { name: 'Feb', amount: 1100 },
    { name: 'Mar', amount: 1300 },
    { name: 'Apr', amount: 950 },
    { name: 'May', amount: 1450 },
    { name: 'Jun', amount: 1250 },
    { name: 'Jul', amount: 430 },
  ];

  const categoryData = [
    { name: 'Food', value: 450, color: '#8884d8' },
    { name: 'Transportation', value: 320, color: '#82ca9d' },
    { name: 'Shopping', value: 280, color: '#ffc658' },
    { name: 'Utilities', value: 200, color: '#ff7c7c' },
    { name: 'Entertainment', value: 150, color: '#8dd1e1' },
  ];

  // Theme-aware colors for charts
  const chartColors = {
    grid: isDark ? '#374151' : '#f0f0f0',
    axis: isDark ? '#9ca3af' : '#666',
    line: isDark ? '#60a5fa' : '#8884d8',
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalExpenses.toFixed(2)}</div>
              <p className="text-xs opacity-90 mt-1">All time expenses</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">This Month</CardTitle>
              <Calendar className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyExpenses.toFixed(2)}</div>
              <p className="text-xs opacity-90 mt-1">July 2024</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Daily Average</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.averageDaily.toFixed(2)}</div>
              <p className="text-xs opacity-90 mt-1">Per day average</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Transactions</CardTitle>
              <Receipt className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.transactionCount}</div>
              <p className="text-xs opacity-90 mt-1">Total transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Trend */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Expense Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="name" stroke={chartColors.axis} />
                    <YAxis stroke={chartColors.axis} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke={chartColors.line}
                      strokeWidth={3}
                      dot={{ fill: chartColors.line, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Receipt className="h-5 w-5 text-purple-600" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between dark:text-white">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-green-600" />
                Recent Transactions
              </div>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.slice(0, 5).map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {expense.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{expense.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category} • {expense.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
