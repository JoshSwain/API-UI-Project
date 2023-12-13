import React, {useState} from 'react'
import { ItemType } from '../types/item';
import { TransactionType } from '../types/transactions';
import TransactionList from '../components/transactions/TransactionsList';
import TransactionForm from '../components/transactions/TransactionForm';
import getObject from '../components/api/getObject';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const TransactionPage: React.FC = () => {
  const [ transactions, setTransactions ] = useState<TransactionType[]>([]);
  const [ items, setItems ] = useState<ItemType[]>([]);

  const getTransactionHandler = () => {
    getObject('transaction', transactions, setTransactions)
  }
  const getItemHandler = () => {
    getObject('item', items, setItems)
  }

  getTransactionHandler();
  getItemHandler();

  return (
    <Container>
      <Typography variant="h2" component="h1">Transactions</Typography>
      <TransactionForm items={items} getTransactionHandler={getTransactionHandler} getItemHandler= {getItemHandler}/>;
      <TransactionList transactions={transactions} />;
    </Container>
  )

};

export default TransactionPage;
