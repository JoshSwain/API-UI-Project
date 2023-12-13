import React, {useState} from 'react'
import { ItemType } from '../types/item';
import ItemsList from '../components/items/ItemsList';
import AddItemForm from '../components/items/AddItemForm';
import getObject from '../components/api/getObject';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const getItemHandler = () => {
    getObject('item', items, setItems)
  }
  getItemHandler()


  return(
    <Container>
        <Typography variant="h2" component="h1">Items</Typography>
        <AddItemForm getItemHandler = {getItemHandler} items={items} />
        <ItemsList items={items} />
    </Container>
  )

};

export default ItemsPage;
