import React, {useEffect} from 'react'
import useTransactionState from '../components/transactions/transactionState';
import useItemState from '../components/items/itemState';
import TransactionList from '../components/transactions/TransactionsList';
import api from '../api';
import TransactionForm from '../components/transactions/TransactionForm';
// import NewTransactionList from '../components/transactions/NewTransactionsList';

const TransactionPage: React.FC = () => {
  const { transactions, updateTransactions } = useTransactionState();
  const { stateitems, updateItems } = useItemState();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await api.get('/transactions/');
      updateTransactions(response.data);
      console.log(response.data);
    };
    const fetchItems = async () => {
      const response = await api.get('/items');
      console.log("Transaction Get request status:",response.status)
      updateItems(response.data);
      ;
    }
    fetchTransactions();
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm items={stateitems}/>
      {/* <NewTransactionList transactions={transactions} items={stateitems}/> */}
      <TransactionList transactions={transactions} />
    </div>
  )

};

export default TransactionPage;
