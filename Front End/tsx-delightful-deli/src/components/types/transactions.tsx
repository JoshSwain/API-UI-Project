import { ItemType } from "./item";

export {};

export type TransactionType = {
    id: number;
    item_id: number;
    direction: string;
    count: number;
  };

export type TransactionListProps = {
    transactions: TransactionType[];
    // items: ItemType[];
};