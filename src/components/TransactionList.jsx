import React from 'react';
import { useTransactionStore } from '../store/transactionStore';

function TransactionList({ transactions }) {
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

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
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={transaction.amount < 0 ? 'table-danger' : 'table-success'}>
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

export default TransactionList; 