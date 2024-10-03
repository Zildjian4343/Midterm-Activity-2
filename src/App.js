import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]); 
  const [text, setText] = useState(''); 
  const [amount, setAmount] = useState(''); 

  // Function to handle adding a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault(); 

    const newTransaction = {
      id: transactions.length + 1, 
      text, 
      amount: +amount, 
    };

    setTransactions([...transactions, newTransaction]); 
    setText(''); 
    setAmount(''); 
  };

  // Calculate total income
  const totalIncome = transactions
    .filter(transaction => transaction.amount > 0) 
    .reduce((acc, transaction) => acc + transaction.amount, 0); 

  
  const totalExpense = transactions
    .filter(transaction => transaction.amount < 0) 
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0); 

  // Calculate the balance
  const balance = totalIncome - totalExpense; 

  return (
    <div className="container">
      <h2>Your Balance</h2>
      <h1>${balance.toFixed(2)}</h1> {}

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${totalIncome.toFixed(2)}</p> {}
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${totalExpense.toFixed(2)}</p> {}
        </div>
      </div>

      <div className="history">
        <h3>History</h3>
        <ul className="list">
          {transactions.map(transaction => (
            <li key={transaction.id} className={transaction.amount > 0 ? 'plus' : 'minus'}>
              {transaction.text} <span>{transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-transaction">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleAddTransaction}>
          <div className="form-control">
            <label htmlFor="text">Transaction Category</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Enter category..." 
              required 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount..." 
              required 
            />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </div>
    </div>
  );
}

export default App;
