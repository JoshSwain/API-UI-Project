import React, {useState, useEffect} from 'react'
import api from './api'
import { CustomChangeEvent, CustomFormEvent } from './components/types/events';
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
  // const [formData, setFormData] = useState( {
  //   count: '',
  //   direction: 'Sale',
  //   item_id: ''
  // });

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

  // const handleInputChange = (event: CustomChangeEvent) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  // const handleFormSubmit = async (event: CustomFormEvent) => {
  //   event.preventDefault();
  //   await api.post('/transactions/', formData);
  //   fetchTransactions();
  // }

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

      //     <div className='container'>
      //       <form onSubmit={handleFormSubmit}>
      //         <div className='mb-3 mt-3'>
      //           <label htmlFor='amount' className='form-label'>
      //             Count
      //           </label>
      //           <input type='number' className='form-control' id='amount' name='count' onChange={handleInputChange} value={formData.count}/>
      //         </div>

      //         <div className='mb-3'>
      //           <label htmlFor='direction' className='form-label'>
      //             Direction
      //           </label>
      //           <select className='form-select' id='direction' name='direction' onChange={handleInputChange} value={formData.direction}>
      //             <option value='Sale'>Sell</option>
      //             <option value='Restock'>Restock</option>
      //           </select>
      //         </div>

      //         {/* <div className='mb-3'>
      //           <label htmlFor='item_id' className='form-label'>
      //             Item ID
      //           </label>
      //           <input type='text' className='form-control' id='item_id' name='item_id' onChange={handleInputChange} value={formData.item_id}/>
      //         </div> */}
      //         <div className='mb-3'>
      //           <label htmlFor='item_id' className='form-label'>
      //             Item
      //           </label>
      //           <select
      //             className='form-select'
      //             id='item_id'
      //             name='item_id'
      //             onChange={handleInputChange}
      //             value={formData.item_id}
      //           >
      //             <option value=''>Select an Item</option>
      //             {items.map((item) => (
      //               <option key={item.id} value={item.id}>
      //                 {item.name}
      //               </option>
      //             ))}
      //           </select>
      //         </div>

      //         {/* <div className='mb-3'>
      //           <label htmlFor='is_income' className='form-label'>
      //             is_income
      //           </label>
      //           <input type='text' className='form-control' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
      //         </div> */}

      //         <button type='submit' className='btn btn-primary mb-3'>
      //           Submit
      //           </button>

      //       </form>

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