import React from 'react'
import { TransactionType } from './transactions'
import { ItemType } from './item'


export type GetObjectsType = ItemType[] | TransactionType[]

export type GetSetterType = React.Dispatch<React.SetStateAction<ItemType[]>> | React.Dispatch<React.SetStateAction<TransactionType[]>>
