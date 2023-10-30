import React, {useEffect} from 'react'
import useItemState from '../components/items/itemState';
import ItemsList from '../components/items/ItemsList';
import api from '../api';

const ItemsPage: React.FC = () => {
    const { items, updateItems } = useItemState();

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      const response = await api.get('/items/');
      updateItems(response.data);
      console.log(response.data);
    };

    fetchItems();
  }, []);

  return <ItemsList items={items} />;

};

export default ItemsPage;
