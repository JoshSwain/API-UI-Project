import React, {useState} from 'react'
import { ItemType } from '../types/item';
import { TransactionType } from '../types/transactions';
import TransactionList from '../components/transactions/TransactionsList';
import TransactionForm from '../components/transactions/TransactionForm';
import fetchObject from '../components/api/fetchObject';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const TransactionPage: React.FC = () => {
  const [ transactions, setTransactions ] = useState<TransactionType[]>([]);
  const [ items, setItems ] = useState<ItemType[]>([]);

  //Handler that can be passed down and allows transactions to be fetched within components on this page
  const fetchTransactionHandler = () => {
    fetchObject('transaction', transactions, setTransactions)
  }

    //Handler that can be passed down and allows items to be fetched within components on this page
  const fetchItemHandler = () => {
    fetchObject('item', items, setItems)
  }

  fetchTransactionHandler();
  fetchItemHandler();

  return (
    <Container>
      <Typography variant="h2" component="h1">Transactions</Typography>
      <TransactionForm items={items} fetchTransactionHandler={fetchTransactionHandler} fetchItemHandler= {fetchItemHandler}/>;
      <TransactionList transactions={transactions} />;
    </Container>
  )

};

export default TransactionPage;
