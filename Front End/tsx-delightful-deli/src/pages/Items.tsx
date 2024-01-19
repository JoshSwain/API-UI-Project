import React, {useState} from 'react'
import { ItemType } from '../types/item';
import ItemsList from '../components/items/ItemsList';
import AddItemForm from '../components/items/AddItemForm';
import fetchObject from '../components/api/fetchObject';
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  //Handler that can be passed down and allows items to be fetched within components on this page
  const fetchItemHandler = () => {
    fetchObject('item', items, setItems)
  }
  fetchItemHandler()


  return(
    <Container>
        <Typography variant="h2" component="h1">Items</Typography>
        <AddItemForm fetchItemHandler = {fetchItemHandler} items={items} />
        <ItemsList items={items} />
    </Container>
  )

};

export default ItemsPage;
