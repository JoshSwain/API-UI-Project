import { InventoryType } from "./inventory";

export {};

export type ItemType = {
    id: number;
    name: string;
    price: number;
    inventory: InventoryType[] ;
  };

export type ItemListProps = {
    items: ItemType[];
  };