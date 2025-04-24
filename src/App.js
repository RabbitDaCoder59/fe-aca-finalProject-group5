import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import { useTransactionStore } from './store/transactionStore';

function App() {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Budgettly</span>
        </div>
      </nav>
      
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Add Transaction</h5>
                <TransactionForm />
              </div>
            </div>
          </div>
          
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

export default App;
