import React from 'react';
import { TransactionType, TransactionContextType } from '../../types/transactions';
import { Container, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { TransactionContext } from '../../context/TransactionContext';
import { ItemContext } from '../../context/ItemContext';
import { ItemContextType, ItemType } from '../../types/item';

const TransactionList: React.FC<{}> = ({}) => {
  //Transactions inherited from transaction context
  const { transactions } = React.useContext(TransactionContext) as TransactionContextType
  const { items } = React.useContext(ItemContext) as ItemContextType

  //Transactions sorted by date created (greatest-smallest transaction id)
  const sortedTransactions = [...transactions].sort((a, b) => b.id - a.id);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item ID</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {sortedTransactions.map((transaction: TransactionType) => {
            // Finds the corresponding item based on transaction.item_id to display the name
            const transactedItem = items.find(item => item.id === transaction.item_id);

            return (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.item_id}</TableCell>
                <TableCell>{transactedItem?.name}</TableCell>
                <TableCell>{transaction.count}</TableCell>
                <TableCell>{transaction.direction}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      </Table>
    </Container>
  );
};

export default TransactionList;
