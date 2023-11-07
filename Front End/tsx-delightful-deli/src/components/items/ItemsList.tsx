import React from 'react';
import { ItemType, ItemListProps } from '../types/item';

const ItemsList: React.FC<ItemListProps> = ({ items }) => {
    return (
    <div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((items: ItemType) => (
            <tr key={items.id}>
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>{items.price}</td>
              <td>{items.inventory[0].quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
