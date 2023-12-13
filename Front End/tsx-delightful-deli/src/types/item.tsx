import { InventoryType } from "./inventory";
import { TransactionType } from "./transactions";

export {};

export type ItemType = {
    id: number;
    name: string;
    price: number;
    category: string;
    inventory: InventoryType[] ;
    transactions: TransactionType[];
  };

export type ItemListProps = {
    items: ItemType[];
  };
