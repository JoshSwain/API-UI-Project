import React from 'react';
import { ItemType, ItemListProps } from '../types/item';

const ItemsList: React.FC<ItemListProps> = ({ items }) => {
    const sortedItems = [...items].sort((a, b) => b.id - a.id);
    return (
    <div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((items: ItemType) => (
            <tr key={items.id}>
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>{items.price}</td>
              <td>{items.category}</td>
              <td>{items.inventory[0].quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
