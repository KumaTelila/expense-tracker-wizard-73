import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, BarChart3, FileText, FileSpreadsheet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { exportToPDF, exportToCSV, ReportData } from '@/utils/reportExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Reports = () => {
  const { isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [reportData, setReportData] = useState<ReportData>({
    monthlyTrend: [],
    categoryBreakdown: [],
    weeklySpending: [],
    insights: []
  });

  useEffect(() => {
    // Generate comprehensive demo data
    const monthlyTrend = [
      { month: 'Jan', amount: 1200, budget: 1500 },
      { month: 'Feb', amount: 1100, budget: 1500 },
      { month: 'Mar', amount: 1300, budget: 1500 },
      { month: 'Apr', amount: 950, budget: 1500 },
      { month: 'May', amount: 1450, budget: 1500 },
      { month: 'Jun', amount: 1250, budget: 1500 },
    ];

    const categoryBreakdown = [
      { name: 'Food & Dining', value: 450, color: '#8884d8', percentage: 32 },
      { name: 'Transportation', value: 320, color: '#82ca9d', percentage: 23 },
      { name: 'Shopping', value: 280, color: '#ffc658', percentage: 20 },
      { name: 'Utilities', value: 200, color: '#ff7c7c', percentage: 14 },
      { name: 'Entertainment', value: 150, color: '#8dd1e1', percentage: 11 },
    ];

    const weeklySpending = [
      { week: 'Week 1', amount: 280 },
      { week: 'Week 2', amount: 350 },
      { week: 'Week 3', amount: 420 },
      { week: 'Week 4', amount: 300 },
    ];

    const insights = [
      { type: 'positive', title: 'Great job!', description: 'You spent 15% less on dining out this month compared to last month.' },
      { type: 'warning', title: 'Budget Alert', description: 'You\'re approaching your monthly shopping budget limit.' },
      { type: 'info', title: 'Spending Pattern', description: 'Your highest spending day is typically Friday.' },
      { type: 'positive', title: 'Savings Opportunity', description: 'You could save $120/month by reducing subscription services.' },
    ];

    setReportData({
      monthlyTrend,
      categoryBreakdown,
      weeklySpending,
      insights
    });
  }, [selectedPeriod]);

  const handleExportPDF = () => {
    exportToPDF(reportData, selectedPeriod);
  };

  const handleExportCSV = () => {
    exportToCSV(reportData, selectedPeriod);
  };

  const totalSpent = reportData.categoryBreakdown.reduce((sum, item) => sum + item.value, 0);
  const averageMonthly = reportData.monthlyTrend.reduce((sum, item) => sum + item.amount, 0) / reportData.monthlyTrend.length;
  const budgetVariance = reportData.monthlyTrend[reportData.monthlyTrend.length - 1]?.amount - reportData.monthlyTrend[reportData.monthlyTrend.length - 1]?.budget;

  // Theme-aware colors for charts
  const chartColors = {
    grid: isDark ? '#374151' : '#f0f0f0',
    axis: isDark ? '#9ca3af' : '#666',
    line: isDark ? '#60a5fa' : '#8884d8',
    area: isDark ? '#1f2937' : '#f5f5f5',
    areaBorder: isDark ? '#4b5563' : '#e0e0e0',
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'warning': return <TrendingDown className="h-4 w-4 text-orange-600" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return isDark ? 'border-green-800 bg-green-900/20' : 'border-green-200 bg-green-50';
      case 'warning': return isDark ? 'border-orange-800 bg-orange-900/20' : 'border-orange-200 bg-orange-50';
      default: return isDark ? 'border-blue-800 bg-blue-900/20' : 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gain insights into your spending patterns and financial health.</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 dark:border-gray-600 dark:bg-gray-800">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-600">
                <DropdownMenuItem onClick={handleExportPDF} className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportCSV} className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-sm opacity-90 mt-1">Last 6 months</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Monthly Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${averageMonthly.toFixed(2)}</div>
              <p className="text-sm opacity-90 mt-1">Per month average</p>
            </CardContent>
          </Card>

          <Card className={`${budgetVariance < 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                {budgetVariance < 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                Budget Variance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${Math.abs(budgetVariance).toFixed(2)}</div>
              <p className="text-sm opacity-90 mt-1">{budgetVariance < 0 ? 'Under budget' : 'Over budget'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Spending Trend */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Spending Trend vs Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="month" stroke={chartColors.axis} />
                    <YAxis stroke={chartColors.axis} />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stackId="1"
                      stroke={chartColors.areaBorder}
                      fill={chartColors.area}
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stackId="2"
                      stroke={chartColors.line}
                      fill={chartColors.line}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {reportData.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Details & Weekly Spending */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Category Details */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">${category.value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Spending */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Weekly Spending Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.weeklySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="week" stroke={chartColors.axis} />
                    <YAxis stroke={chartColors.axis} />
                    <Bar dataKey="amount" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportData.insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                    </div>
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

export default Reports;
