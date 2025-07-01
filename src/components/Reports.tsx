
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [reportData, setReportData] = useState({
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
      { type: 'positive.', title: 'Savings Opportunity', description: 'You could save $120/month by reducing subscription services.' },
    ];

    setReportData({
      monthlyTrend,
      categoryBreakdown,
      weeklySpending,
      insights
    });
  }, [selectedPeriod]);

  const totalSpent = reportData.categoryBreakdown.reduce((sum, item) => sum + item.value, 0);
  const averageMonthly = reportData.monthlyTrend.reduce((sum, item) => sum + item.amount, 0) / reportData.monthlyTrend.length;
  const budgetVariance = reportData.monthlyTrend[reportData.monthlyTrend.length - 1]?.amount - reportData.monthlyTrend[reportData.monthlyTrend.length - 1]?.budget;

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'warning': return <TrendingDown className="h-4 w-4 text-orange-600" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Gain insights into your spending patterns and financial health.</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Spending Trend vs Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stackId="1"
                      stroke="#e0e0e0"
                      fill="#f5f5f5"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stackId="2"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${category.value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Spending */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Weekly Spending Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.weeklySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Bar dataKey="amount" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.description}</p>
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
