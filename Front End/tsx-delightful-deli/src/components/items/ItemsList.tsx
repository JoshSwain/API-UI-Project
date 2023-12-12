import React from 'react';
import { ItemType, ItemListProps } from '../types/item';
import { Container, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ItemsList: React.FC<ItemListProps> = ({ items }) => {
  const sortedItems = [...items].sort((a, b) => b.id - a.id);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map((item: ItemType) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.inventory[0].quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ItemsList;
