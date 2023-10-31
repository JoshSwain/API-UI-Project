import React from 'react';
import { TransactionType, TransactionListProps } from '../types/transactions';

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Count</th>
            <th>Direction</th>
            <th>Item ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: TransactionType) => (
            <tr key={transaction.id}>
              <td>{transaction.count}</td>
              <td>{transaction.direction}</td>
              <td>{transaction.item_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
