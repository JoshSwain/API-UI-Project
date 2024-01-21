export type TransactionType = {
    id: number;
    item_id: number;
    direction: string;
    count: number;
  };

export type TransactionListProps = {
    transactions: TransactionType[];
};

export type TransactionContextType = {
    transactions: TransactionType[],
    fetchTransactionHandler: () => void
}