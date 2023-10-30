export {};

export type ItemType = {
    id: number;
    name: string;
    price: number
  };

export type ItemListProps = {
    items: ItemType[];
  };