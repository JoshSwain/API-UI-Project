import React from 'react'
import TransactionList from '../components/transactions/TransactionsList';
import TransactionForm from '../components/transactions/TransactionForm';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';


const TransactionPage: React.FC = () => {

  return (
    <Container>
      <Typography variant="h2" component="h1">Transactions</Typography>
      <TransactionForm/>;
      <TransactionList/>;
    </Container>
  )

};

export default TransactionPage;
