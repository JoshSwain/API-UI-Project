import React, {useState} from 'react'
import { ItemType } from '../components/types/item';
import { TransactionType } from '../components/types/transactions';
import TransactionList from '../components/transactions/TransactionsList';
import TransactionForm from '../components/transactions/TransactionForm';
import getObject from '../components/api/getObject';


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
    <div>
      <h1>Transactions</h1>
      <TransactionForm items={items} getTransactionHandler={getTransactionHandler} getItemHandler= {getItemHandler}/>
      <TransactionList transactions={transactions} />
    </div>
  )

};

export default TransactionPage;
