import React from 'react';
import { ItemType, ItemContextType } from '../../types/item';
import { Container, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { ItemContext } from '../../context/ItemContext';

const ItemsList: React.FC<{}> = () => {
  //Pulls items from the ItemContext
  const {items} = React.useContext(ItemContext) as ItemContextType

  //Sorts items by date created (largest-smallest id)
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
