import React, {useState} from 'react'
import ItemsList from '../components/items/ItemsList';
import AddItemForm from '../components/items/AddItemForm';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const ItemsPage: React.FC = () => {
  return(
    <Container>
        <Typography variant="h2" component="h1">Items</Typography>
        <AddItemForm/>
        <ItemsList/>
    </Container>
  )

};

export default ItemsPage;
