import React from 'react';
import useTransactionStore from '../store/transactionStore';

function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  return (
    <div className="mb-4">
      <h5>Transactions</h5>
      <ul className="list-group">
        {transactions.map((txn) => (
          <li
            key={txn.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              txn.amount >= 0 ? 'list-group-item-success' : 'list-group-item-danger'
            }`}
          >
            <span>{txn.title} ({txn.category})</span>
            <div>
              <span>₦{txn.amount}</span>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => deleteTransaction(txn.id)}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
