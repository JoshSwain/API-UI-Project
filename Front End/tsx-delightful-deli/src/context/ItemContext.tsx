import React, { useState, createContext } from "react";
import { ItemContextType, ItemType } from "../types/item";
import fetchObject from "../components/api/fetchObject";

//This ItemContext allows the state to be passed down to components anywhere on the application.
export const ItemContext = createContext<ItemContextType | null>(null);
export const ItemContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [items, setItems] = useState<ItemType[]>([])

//fetchItemHandler is a function that can be passed down that allows the component to refresh the items list
    const fetchItemHandler = () => {
        fetchObject('item', items, setItems)
      }
      fetchItemHandler()

    return (
        <ItemContext.Provider value = {{ items, fetchItemHandler}}>
            { children }
        </ItemContext.Provider>
    )
}