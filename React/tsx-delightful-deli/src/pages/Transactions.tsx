import React, {useEffect} from 'react'
import useTransactionState from '../components/transactions/transactionState';
import TransactionList from '../components/transactions/TransactionsList';
import api from '../api';

const TransactionPage: React.FC = () => {
    const { transactions, updateTransactions } = useTransactionState();

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await api.get('/transactions/');
      updateTransactions(response.data);
      console.log(response.data);
    };

    fetchTransactions();
  }, []);

  return <TransactionList transactions={transactions} />;

};

export default TransactionPage;
