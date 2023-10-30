import React, { useState } from 'react';
import { ItemType } from '../types/item';

const useItemState = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    const updateItems = (newData: ItemType[]) => {
        setItems(newData);
      };
    return { items, updateItems };
  };

  export default useItemState;
