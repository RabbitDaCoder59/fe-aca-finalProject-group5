import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard({ transactions }) {
  // Calculate total income, expenses, and balance
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expenses += Math.abs(transaction.amount);
      }
      acc.balance = acc.income - acc.expenses;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );

  // Prepare data for category distribution chart
  const categoryData = transactions.reduce((acc, transaction) => {
    const amount = Math.abs(transaction.amount);
    if (!acc[transaction.category]) {
      acc[transaction.category] = amount;
    } else {
      acc[transaction.category] += amount;
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="card-title">Total Income</h6>
              <h4 className="card-text">{formatCurrency(totals.income)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h6 className="card-title">Total Expenses</h6>
              <h4 className="card-text">{formatCurrency(totals.expenses)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6 className="card-title">Balance</h6>
              <h4 className="card-text">{formatCurrency(totals.balance)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Expense by Category</h5>
              <div className="chart-container">
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieChartData}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Income vs Expenses</h5>
              <div className="chart-container">
                <BarChart
                  width={300}
                  height={300}
                  data={[
                    {
                      name: 'Overview',
                      Income: totals.income,
                      Expenses: totals.expenses
                    }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="Income" fill="#00C49F" />
                  <Bar dataKey="Expenses" fill="#FF8042" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 