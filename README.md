# Budgettly - Personal Finance Tracker

A React-based personal finance tracking application that helps users manage their income and expenses with visual analytics.

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard.jsx   # Main dashboard with charts
│   ├── TransactionForm.jsx    # Form to add new transactions
│   └── TransactionList.jsx    # List of all transactions
├── store/             # State management
│   └── transactionStore.js    # Zustand store for transactions
├── App.jsx            # Main application component
└── App.css            # Application styles
```

## Detailed Code Explanation

### 1. App.jsx - Main Application Component

```jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import { useTransactionStore } from './store/transactionStore';

function App() {
  // Get transactions from the store using Zustand
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Budgettly</span>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Left Column - Transaction Form */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Add Transaction</h5>
                <TransactionForm />
              </div>
            </div>
          </div>
          
          {/* Right Column - Dashboard & Transaction List */}
          <div className="col-md-8">
            <Dashboard transactions={transactions} />
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Recent Transactions</h5>
                <TransactionList transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Explanation:**
- The `App` component is the root component of our application
- It uses Bootstrap's grid system (`container`, `row`, `col-md-4`, `col-md-8`) for layout
- The layout is divided into two main sections:
  1. Left side (4 columns): Transaction form for adding new transactions
  2. Right side (8 columns): Dashboard and transaction list
- The `transactions` data is fetched from the Zustand store using `useTransactionStore`
- This data is then passed down to child components (`Dashboard` and `TransactionList`) as props

### 2. TransactionForm.jsx - Form Component

```jsx
import React, { useState } from 'react';
import { useTransactionStore } from '../store/transactionStore';

// Predefined categories for transactions
const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Income',
  'Other'
];

function TransactionForm() {
  // Get addTransaction function from the store
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  
  // Initialize form state using useState hook
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining'
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Convert amount to positive or negative based on type
    const amount = formData.type === 'expense' 
      ? -Math.abs(parseFloat(formData.amount)) // Make negative for expenses
      : Math.abs(parseFloat(formData.amount)); // Keep positive for income
      
    // Add new transaction to the store
    addTransaction({
      ...formData,
      amount,
      date: new Date(formData.date).toISOString()
    });
    
    // Reset form fields after submission
    setFormData({
      ...formData,
      description: '',
      amount: ''
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Date Input */}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description Input */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
      </div>

      {/* Amount Input */}
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          step="0.01"
          min="0"
          required
        />
      </div>

      {/* Transaction Type Select */}
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category Select */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        Add Transaction
      </button>
    </form>
  );
}
```

**Explanation:**
- The form uses React's `useState` hook to manage form state
- `formData` object stores all form field values
- `handleChange` function updates the state when any input changes
- `handleSubmit` function:
  1. Prevents default form submission
  2. Converts amount to positive/negative based on type
  3. Adds new transaction to the store
  4. Resets form fields
- Form validation using HTML5 attributes (`required`, `min`, `step`)
- Bootstrap classes for styling (`form-control`, `form-select`, `btn-primary`)

### 3. TransactionList.jsx - List Component

```jsx
import React from 'react';
import { useTransactionStore } from '../store/transactionStore';

function TransactionList({ transactions }) {
  // Get deleteTransaction function from the store
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  // Format date to local string (e.g., "1/1/2024")
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Format amount to currency (e.g., "$100.00")
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="transaction-list">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through transactions and create table rows */}
            {transactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                className={transaction.amount < 0 ? 'table-danger' : 'table-success'}
              >
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>
                  <span className="badge bg-secondary">
                    {transaction.category}
                  </span>
                </td>
                <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                  {formatAmount(transaction.amount)}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* Show message if no transactions */}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No transactions found. Add some transactions to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Explanation:**
- Receives `transactions` array as a prop
- Uses helper functions to format dates and amounts
- Maps through transactions to create table rows
- Conditional styling based on transaction type:
  - Red for expenses (negative amounts)
  - Green for income (positive amounts)
- Delete button for each transaction
- Empty state message when no transactions exist

### 4. Dashboard.jsx - Analytics Component

```jsx
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

// Colors for pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard({ transactions }) {
  // Calculate totals using reduce
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

  // Convert category data to array format for charts
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
        {/* Pie Chart */}
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

        {/* Bar Chart */}
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
```

**Explanation:**
- Uses Recharts library for data visualization
- Calculates totals using `reduce`:
  1. Sums up income (positive amounts)
  2. Sums up expenses (negative amounts)
  3. Calculates balance (income - expenses)
- Prepares data for charts:
  1. Groups transactions by category
  2. Calculates total amount per category
  3. Formats data for pie chart
- Displays three types of visualizations:
  1. Summary cards (income, expenses, balance)
  2. Pie chart (expense distribution by category)
  3. Bar chart (income vs expenses comparison)

### 5. State Management (transactionStore.js)

```jsx
import { create } from 'zustand';

export const useTransactionStore = create((set) => ({
  // Initial state
  transactions: [],
  
  // Actions
  addTransaction: (transaction) => 
    set((state) => ({
      transactions: [...state.transactions, { ...transaction, id: Date.now() }]
    })),
    
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id)
    })),
    
  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) => 
        t.id === id ? { ...t, ...updatedTransaction } : t
      )
    })),
    
  clearTransactions: () => set({ transactions: [] })
}));
```

**Explanation:**
- Uses Zustand for state management
- Store contains:
  1. State: `transactions` array
  2. Actions:
     - `addTransaction`: Adds new transaction with unique ID
     - `deleteTransaction`: Removes transaction by ID
     - `updateTransaction`: Updates existing transaction
     - `clearTransactions`: Resets transactions array
- Each action uses `set` to update state immutably

## Key React Concepts Used

1. **Components**
   - Functional components
   - Props passing
   - Component composition

2. **Hooks**
   - `useState` for form state
   - Custom hooks (useTransactionStore)

3. **State Management**
   - Zustand store
   - State updates
   - Data flow

4. **Event Handling**
   - Form submission
   - Input changes
   - Button clicks

5. **Data Processing**
   - Array methods (map, reduce)
   - Date formatting
   - Currency formatting

6. **Styling**
   - Bootstrap classes
   - Conditional classes
   - Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Learning Resources

1. **React Basics**
   - [React Documentation](https://reactjs.org/docs/getting-started.html)
   - [React Hooks](https://reactjs.org/docs/hooks-intro.html)
   - [JSX Syntax](https://reactjs.org/docs/introducing-jsx.html)

2. **State Management**
   - [Zustand Documentation](https://github.com/pmndrs/zustand)
   - [React State Management](https://reactjs.org/docs/state-and-lifecycle.html)

3. **Styling**
   - [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
   - [CSS in React](https://reactjs.org/docs/faq-styling.html)

4. **Data Visualization**
   - [Recharts Documentation](https://recharts.org/en-US/)
   - [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
