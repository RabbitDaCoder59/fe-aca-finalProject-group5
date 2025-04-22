import React, { useState } from 'react';
import useTransactionStore from '../store/transactionStore';

function BudgetPlanner() {
  const [budget, setBudget] = useState('');
  const transactions = useTransactionStore((state) => state.transactions);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const remaining = budget ? budget - totalExpense : 0;

  return (
    <div className="mb-4">
      <h5>Budget Planner</h5>
      <div className="mb-2">
        <input
          type="number"
          placeholder="Set your monthly budget"
          className="form-control"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        <p>Total Expense: ₦{totalExpense}</p>
        <p>Remaining Budget: ₦{remaining}</p>
      </div>
    </div>
  );
}

export default BudgetPlanner;
