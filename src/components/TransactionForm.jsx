import React, { useState } from 'react';
import useTransactionStore from '../store/transactionStore';

function TransactionForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category: amount >= 0 ? 'Income' : 'Expense',
    };

    addTransaction(newTransaction);
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Transaction Title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Amount (+income, -expense)"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
