import React, { useState, createContext } from "react";
import fetchObject from "../components/api/fetchObject";
import { TransactionContextType, TransactionType } from "../types/transactions";

//This ItemContext allows the state to be passed down to components anywhere on the application.
export const TransactionContext = createContext<TransactionContextType | null>(null);
export const TransactionContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [transactions, setTransactions] = useState<TransactionType[]>([])

//fetchItemHandler is a function that can be passed down that allows the component to refresh the items list
    const fetchTransactionHandler = () => {
        fetchObject('transaction', transactions, setTransactions)
      }
      fetchTransactionHandler()

    return (
        <TransactionContext.Provider value = {{ transactions, fetchTransactionHandler}}>
            { children }
        </TransactionContext.Provider>
    )
}