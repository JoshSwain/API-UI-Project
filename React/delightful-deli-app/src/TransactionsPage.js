import React, {useState, useEffect} from 'react'
import api from './api'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    count: '',
    direction: 'sale',
    item_id: ''
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data)
  }

  const fetchItems = async () => {
    try {
      const response = await api.get('/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchItems();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      count: '',
      direction: 'sale',
      item_id: ''
    })
  }

  return (
    <div>
        <nav className='navbar navbar-dark bg-primary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Delightful Deli Inventory Tool
            </a>
          </div>
        </nav>
        <h1>
            Transactions
        </h1>

        <div className='container'>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-3 mt-3'>
              <label htmlFor='amount' className='form-label'>
                Count
              </label>
              <input type='number' className='form-control' id='amount' name='count' onChange={handleInputChange} value={formData.count}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='direction' className='form-label'>
                Direction
              </label>
              <select className='form-select' id='direction' name='direction' onChange={handleInputChange} value={formData.direction}>
                <option value='sale'>Sell</option>
                <option value='restock'>Restock</option>
              </select>
            </div>

            {/* <div className='mb-3'>
              <label htmlFor='item_id' className='form-label'>
                Item ID
              </label>
              <input type='text' className='form-control' id='item_id' name='item_id' onChange={handleInputChange} value={formData.item_id}/>
            </div> */}
            <div className='mb-3'>
              <label htmlFor='item_id' className='form-label'>
                Item
              </label>
              <select
                className='form-select'
                id='item_id'
                name='item_id'
                onChange={handleInputChange}
                value={formData.item_id}
              >
                <option value=''>Select an Item</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className='mb-3'>
              <label htmlFor='is_income' className='form-label'>
                is_income
              </label>
              <input type='text' className='form-control' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
            </div> */}

            <button type='submit' className='btn btn-primary mb-3'>
              Submit
              </button>

          </form>

          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th>Count</th>
                <th>Direction</th>
                <th>Item ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.count}</td>
                  <td>{transaction.direction}</td>
                  <td>{transaction.item_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}
export default TransactionsPage;
