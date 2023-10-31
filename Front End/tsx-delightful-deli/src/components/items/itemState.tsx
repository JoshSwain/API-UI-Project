import React, { useState } from 'react';
import { ItemType } from '../types/item';

const useItemState = () => {
    const [stateitems, setItems] = useState<ItemType[]>([]);
    const updateItems = (newData: ItemType[]) => {
        setItems(newData);
      };
    return { stateitems, updateItems };
  };

  export default useItemState;
