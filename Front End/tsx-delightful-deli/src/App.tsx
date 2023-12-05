import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionPage from './pages/Transactions';
import ItemsPage from './pages/Items';
import HomePage from './pages/Home';

//Main React app, from here all pages are routed
const App = () => {

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
        <Route path="/" element = {<HomePage/>}>
        </Route>
      </Routes>
    </Router>

  )
}
export default App;
