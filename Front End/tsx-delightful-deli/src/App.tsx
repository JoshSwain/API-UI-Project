import React, {useState, useEffect} from 'react'
import api from './api'
import { ItemType } from './components/types/item';
import { TransactionType } from './components/types/transactions';
import { Link } from 'react-router-dom'
import fetchTransactions from './components/transactions/TransactionsList';
import useTransactionState from './components/transactions/transactionState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionList from './components/transactions/TransactionsList';
import TransactionPage from './pages/Transactions';
import ItemsPage from './pages/Items';

//Main React app, currently just the Transaction Page, but I'm going to split it into a transactions page and an items page
const App = () => {

  // const [transactions, setTransactions] = useState<TransactionType[]>([]);
  // const [items, setItems] = useState<ItemType[]>([]);
  // //Gets all transactions
  // const fetchTransactions = async () => {
  //   const response = await api.get('/transactions/');
  //   setTransactions(response.data)
  // }

  // const fetchItems = async () => {
  //   try {
  //     const response = await api.get('/items/');
  //     setItems(response.data);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTransactions();
  //   fetchItems();
  // }, []);



  return (
    <Router>
      <nav className='navbar navbar-dark bg-primary'>
              <div className='container-fluid'>
                <Link to="/" className='navbar-brand'>
                  Delightful Deli Inventory Tool
                </Link>
                <Link to="/transactions" className='navbar-brand'>Transactions</Link>
                <Link to="/items" className='navbar-brand'>Items</Link>
              </div>
      </nav>
      <Routes>
        <Route path="/transactions" element = {<TransactionPage/>}>
        </Route>
        <Route path="/items" element = {<ItemsPage/>}>
        </Route>
      </Routes>
    </Router>
      // <div>
      //     <nav className='navbar navbar-dark bg-primary'>
      //       <div className='container-fluid'>
      //         <a href="#" className='navbar-brand'>
      //           Delightful Deli Inventory Tool
      //         </a>
      //       </div>
      //     </nav>
      //     <h1>
      //         Transactions
      //     </h1>
      //     <div>

      //       {/* ... Other content of your main app */}
      //     </div>

      

      //       <table className='table table-striped table-bordered table-hover'>
      //         <thead>
      //           <tr>
      //             <th>Count</th>
      //             <th>Direction</th>
      //             <th>Item ID</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {transactions.map((transaction) => (
      //             <tr key={transaction.id}>
      //               <td>{transaction.count}</td>
      //               <td>{transaction.direction}</td>
      //               <td>{transaction.item_id}</td>
      //             </tr>
      //           ))}
      //         </tbody>
      //       </table>
      //     </div>
      // </div>
      
  )
}
export default App;
