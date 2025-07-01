import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Search, Filter, Edit, Trash2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const ExpenseManager = () => {
  const { isDark } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date(),
    description: ''
  });
  const { toast } = useToast();

  const categories = [
    'Food', 'Transportation', 'Shopping', 'Utilities', 'Entertainment',
    'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const categoryColors = {
    Food: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Transportation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Utilities: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Healthcare: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Travel: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  useEffect(() => {
    const demoExpenses = [
      { id: 1, amount: 45.50, category: 'Food', date: '2024-07-01', description: 'Lunch at Italian restaurant with colleagues' },
      { id: 2, amount: 120.00, category: 'Transportation', date: '2024-06-30', description: 'Monthly gas fill-up for commuting' },
      { id: 3, amount: 89.99, category: 'Shopping', date: '2024-06-29', description: 'New wireless headphones from online store' },
      { id: 4, amount: 25.00, category: 'Food', date: '2024-06-28', description: 'Morning coffee and pastry' },
      { id: 5, amount: 150.00, category: 'Utilities', date: '2024-06-27', description: 'Monthly electricity bill payment' },
      { id: 6, amount: 75.50, category: 'Entertainment', date: '2024-06-26', description: 'Movie tickets and snacks' },
      { id: 7, amount: 200.00, category: 'Healthcare', date: '2024-06-25', description: 'Dentist appointment and cleaning' },
      { id: 8, amount: 35.00, category: 'Transportation', date: '2024-06-24', description: 'Uber ride to airport' },
    ];
    setExpenses(demoExpenses);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (Number(formData.amount) <= 0) {
      toast({
        title: "Error",
        description: "Amount must be a positive number.",
        variant: "destructive",
      });
      return;
    }
    const newExpense = {
      id: Date.now(),
      amount: Number(formData.amount),
      category: formData.category,
      date: format(formData.date, 'yyyy-MM-dd'),
      description: formData.description
    };
    if (editingExpense) {
      setExpenses(prev => prev.map(exp => exp.id === editingExpense.id ? { ...newExpense, id: editingExpense.id } : exp));
      setIsEditDialogOpen(false);
      setEditingExpense(null);
      toast({
        title: "Success",
        description: "Expense updated successfully!",
      });
    } else {
      setExpenses(prev => [newExpense, ...prev]);
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Expense added successfully!",
      });
    }
    setFormData({ amount: '', category: '', date: new Date(), description: '' });
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      date: new Date(expense.date),
      description: expense.description
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    toast({
      title: "Success",
      description: "Expense deleted successfully!",
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ExpenseForm = ({ isEdit = false }) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="dark:text-gray-200">Amount *</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleInputChange}
            required
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="dark:text-gray-200">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="dark:text-gray-200">Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-600",
                !formData.date && "text-muted-foreground dark:text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-600">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))}
              initialFocus
              className="pointer-events-auto dark:bg-gray-800 dark:text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="dark:text-gray-200">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add a description (optional)"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:text-white">
        {isEdit ? 'Update Expense' : 'Add Expense'}
      </Button>
    </form>
  );

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Manager</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage all your expenses in one place.</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-600">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Add New Expense</DialogTitle>
              </DialogHeader>
              <ExpenseForm />
            </DialogContent>
          </Dialog>
        </div>
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-300" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Expenses ({filteredExpenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by adding your first expense.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {expense.category.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{expense.description || 'No description'}</p>
                          <Badge className={`${categoryColors[expense.category]} text-xs`}>
                            {expense.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(expense)}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-gray-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-600">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Edit Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm isEdit={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExpenseManager;