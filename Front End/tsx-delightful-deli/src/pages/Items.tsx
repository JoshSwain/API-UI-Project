import React, {useState} from 'react'
import { ItemType } from '../components/types/item';
import ItemsList from '../components/items/ItemsList';
import AddItemForm from '../components/items/AddItemForm';
import getObject from '../components/api/getObject';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const getItemHandler = () => {
    getObject('item', items, setItems)
  }
  getItemHandler()
  // fetchItems();


  return(
    <div>
        <h1>Items</h1>
        <AddItemForm getItemHandler = {getItemHandler} items={items} />;
        <ItemsList items={items} />;
    </div>
  )

};

export default ItemsPage;
