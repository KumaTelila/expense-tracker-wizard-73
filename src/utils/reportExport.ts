
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export interface ReportData {
  monthlyTrend: Array<{ month: string; amount: number; budget: number }>;
  categoryBreakdown: Array<{ name: string; value: number; percentage: number }>;
  weeklySpending: Array<{ week: string; amount: number }>;
  insights: Array<{ type: string; title: string; description: string }>;
}

export const exportToPDF = (data: ReportData, period: string) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Expense Report', 20, 20);
  
  // Period
  doc.setFontSize(12);
  doc.text(`Period: ${period}`, 20, 35);
  
  // Monthly Trend Table
  doc.setFontSize(14);
  doc.text('Monthly Spending Trend', 20, 55);
  
  const monthlyData = data.monthlyTrend.map(item => [
    item.month,
    `$${item.amount.toFixed(2)}`,
    `$${item.budget.toFixed(2)}`,
    `$${(item.amount - item.budget).toFixed(2)}`
  ]);
  
  (doc as any).autoTable({
    head: [['Month', 'Spent', 'Budget', 'Variance']],
    body: monthlyData,
    startY: 65,
    theme: 'grid'
  });
  
  // Category Breakdown
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.text('Category Breakdown', 20, finalY);
  
  const categoryData = data.categoryBreakdown.map(item => [
    item.name,
    `$${item.value.toFixed(2)}`,
    `${item.percentage}%`
  ]);
  
  (doc as any).autoTable({
    head: [['Category', 'Amount', 'Percentage']],
    body: categoryData,
    startY: finalY + 10,
    theme: 'grid'
  });
  
  // Weekly Spending
  const finalY2 = (doc as any).lastAutoTable.finalY + 20;
  doc.text('Weekly Spending', 20, finalY2);
  
  const weeklyData = data.weeklySpending.map(item => [
    item.week,
    `$${item.amount.toFixed(2)}`
  ]);
  
  (doc as any).autoTable({
    head: [['Week', 'Amount']],
    body: weeklyData,
    startY: finalY2 + 10,
    theme: 'grid'
  });
  
  // Save
  doc.save(`expense-report-${period}.pdf`);
};

export const exportToCSV = (data: ReportData, period: string) => {
  const csvContent = [];
  
  // Header
  csvContent.push('Expense Report');
  csvContent.push(`Period: ${period}`);
  csvContent.push('');
  
  // Monthly Trend
  csvContent.push('Monthly Spending Trend');
  csvContent.push('Month,Spent,Budget,Variance');
  data.monthlyTrend.forEach(item => {
    csvContent.push(`${item.month},$${item.amount.toFixed(2)},$${item.budget.toFixed(2)},$${(item.amount - item.budget).toFixed(2)}`);
  });
  
  csvContent.push('');
  
  // Category Breakdown
  csvContent.push('Category Breakdown');
  csvContent.push('Category,Amount,Percentage');
  data.categoryBreakdown.forEach(item => {
    csvContent.push(`${item.name},$${item.value.toFixed(2)},${item.percentage}%`);
  });
  
  csvContent.push('');
  
  // Weekly Spending
  csvContent.push('Weekly Spending');
  csvContent.push('Week,Amount');
  data.weeklySpending.forEach(item => {
    csvContent.push(`${item.week},$${item.amount.toFixed(2)}`);
  });
  
  // Download
  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `expense-report-${period}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
