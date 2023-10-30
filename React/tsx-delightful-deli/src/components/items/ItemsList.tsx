import React from 'react';
import { ItemType, ItemListProps } from '../types/item';

const ItemsList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div>
      <h1>Items</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((items: ItemType) => (
            <tr key={items.id}>
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>{items.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
