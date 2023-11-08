import React from 'react';
import { TransactionType, TransactionListProps } from '../types/transactions';

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Count</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: TransactionType) => (
            <tr key={transaction.id}>
              <td>{transaction.item_id}</td>
              <td>{transaction.count}</td>
              <td>{transaction.direction}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
