import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionPage from './pages/Transactions';
import ItemsPage from './pages/Items';
import HomePage from './pages/Home';
import { AppBar, ThemeProvider, Toolbar, Typography, Stack } from '@mui/material';
import blueTheme from './themes/blueTheme';
import { ItemContextProvider } from './context/ItemContext';
import { TransactionContextProvider } from './context/TransactionContext';
// import blackAndWhiteTheme from './themes/blackAndWhiteTheme';
// import bubbleGumTheme from './themes/bubbleGumTheme';

const currentTheme = blueTheme
// const currentTheme = blackAndWhiteTheme
// const currentTheme = bubbleGumTheme


//Main React app, from here all pages are routed
const App = () => {

  return (
    //Wrappers that provide item and transaction context as well as the theme.
    <ItemContextProvider>
    <TransactionContextProvider>
    <ThemeProvider theme={currentTheme}>

      <Router>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6" component='div' sx={{ flexGrow: 1}}>
              Delightful Deli Inventory Tool
            </Typography>
            <Stack direction='row' spacing={2}>
              <Link to="/" className='navbar-brand'>Home</Link>
              <Link to="/transactions" className='navbar-brand'>Transactions</Link>
              <Link to="/items" className='navbar-brand'>Items</Link>

            </Stack>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/transactions" element = {<TransactionPage/>}>
          </Route>
          <Route path="/items" element = {<ItemsPage/>}>
          </Route>
          <Route path="/" element = {<HomePage/>}>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
    </TransactionContextProvider>
    </ItemContextProvider>
  )
}
export default App;
