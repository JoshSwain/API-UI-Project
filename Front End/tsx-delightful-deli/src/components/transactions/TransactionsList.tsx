import React from 'react';
import { TransactionType, TransactionListProps } from '../../types/transactions';
import { Container, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item ID</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: TransactionType) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.item_id}</TableCell>
              <TableCell>{transaction.count}</TableCell>
              <TableCell>{transaction.direction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TransactionList;
