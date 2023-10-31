import React, {useEffect} from 'react'
import useItemState from '../components/items/itemState';
import ItemsList from '../components/items/ItemsList';
import api from '../api';
import AddItemForm from '../components/items/AddItemForm';

const ItemsPage: React.FC = () => {
    const { stateitems, updateItems } = useItemState();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await api.get('/items/');
      console.log("Get request status: ", response.status)
      updateItems(response.data);
    };

    fetchItems();
  }, []);

  return(
    <div>
        <h1>Items</h1>
        <AddItemForm additems={stateitems} />;
        <ItemsList items={stateitems} />;
    </div>
  )

};

export default ItemsPage;
