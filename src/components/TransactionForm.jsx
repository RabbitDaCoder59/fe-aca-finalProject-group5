import React, { useState } from 'react';
import { useTransactionStore } from '../store/transactionStore';

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
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = formData.type === 'expense' 
      ? -Math.abs(parseFloat(formData.amount))
      : Math.abs(parseFloat(formData.amount));
      
    addTransaction({
      ...formData,
      amount,
      date: new Date(formData.date).toISOString()
    });
    
    setFormData({
      ...formData,
      description: '',
      amount: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit" className="btn btn-primary w-100">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm; 