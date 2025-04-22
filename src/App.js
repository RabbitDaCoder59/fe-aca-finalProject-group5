import React from 'react'; // Import React (in case you need it)
import './App.css'; // Custom styles
import Header from './components/Header'; // Assuming you have a Header component
import TransactionForm from './components/TransactionForm'; // Assuming you have a TransactionForm component
import TransactionList from './components/TransactionList'; // Assuming you have a TransactionList component

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container mt-4">
        <TransactionForm />
        <TransactionList />
      </main>
    </div>
  );
}

export default App;
