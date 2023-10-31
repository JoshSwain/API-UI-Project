import React, { useState } from 'react';
import { TransactionType } from '../types/transactions';

const useTransactionState = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const updateTransactions = (newData: TransactionType[]) => {
        setTransactions(newData);
      };
    return { transactions, updateTransactions };
  };

  export default useTransactionState;
