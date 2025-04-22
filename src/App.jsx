import React from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Chart from './components/Chart';              
import BudgetPlanner from './components/BudgetPlanner';
import CSVExport from './components/CSVExport';        
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <TransactionForm />
        <TransactionList />
        
        {/* Week 2 Features */}
        <Chart />
        <BudgetPlanner />
        <CSVExport />
      </main>
    </>
  );
}

export default App;
