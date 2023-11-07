import { useState, useEffect } from 'react';
import { ItemType } from '../types/item';
import api from '../../api';

const useItemState = () => {
    const [stateitems, setItems] = useState<ItemType[]>([]);
    const updateItems = (newData: ItemType[]) => {
        setItems(newData);
      };
    useEffect(() => {
      const fetchItems = async () => {
        const response = await api.get('/items/');
        console.log("Get request status: ", response.status)
        updateItems(response.data);
        };

        fetchItems();
      }, []);
    return { stateitems, updateItems};
  };

  export default useItemState;
