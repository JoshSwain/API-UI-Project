import React, { useState } from 'react';
import { CustomFormEvent } from '../../types/events';
import { ItemContextType } from '../../types/item';
import saveObject from '../api/saveObject';
import { Button, Container, Select, MenuItem, TextField, Stack } from '@mui/material';
import transactionHandleFormSubmit from './transactionHandleFormSubmit';
import { TransactionContext } from '../../context/TransactionContext';
import { TransactionContextType } from '../../types/transactions';
import { ItemContext } from '../../context/ItemContext';

const TransactionForm: React.FC<{}> = () => {
    //Items, item fetcher, and transation fetcher inherited via the context
    const {items, fetchItemHandler} = React.useContext(ItemContext) as ItemContextType
    const {fetchTransactionHandler} = React.useContext(TransactionContext) as TransactionContextType

    //Default form data
    const [ formData, setFormData] = useState( {
        count: 0,
        direction: 'Sale',
        item_id: '',
    });

    const handleInputChange = (event: any) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    //Runs form data through validation and alerts if there is an issue before submitting and saving.
    const handleFormSubmit = async (event: CustomFormEvent) => {
        event.preventDefault();
        const response = transactionHandleFormSubmit(items, formData)
        if (response) {
          alert(response)
          return
        }
        //Custom save function managed in components/api/saveObject
        saveObject('transaction', formData, fetchTransactionHandler, fetchItemHandler)

        }

        return (
          <Container>
            <div className='container'>
              <form onSubmit={handleFormSubmit}>
                <Stack spacing={4}>
                  <Stack direction='row' spacing={2}>
                    <TextField
                      label='Count'
                      type='number'
                      id='amount'
                      name='count'
                      onChange={handleInputChange}
                      value={formData.count}
                      fullWidth
                    />

                    <Select
                      label='Direction'
                      id='direction'
                      name='direction'
                      onChange={handleInputChange}
                      value={formData.direction}
                      fullWidth
                    >
                      <MenuItem value='Sale'>Sell</MenuItem>
                      <MenuItem value='Restock'>Restock</MenuItem>
                    </Select>

                    <Select
                      label='Item'
                      id='item_id'
                      name='item_id'
                      onChange={handleInputChange}
                      value={formData.item_id}
                      fullWidth
                    >
                      <MenuItem value=''>Select an Item</MenuItem>
                      {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>

                    <Button type='submit' variant='outlined'>
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </div>
          </Container>
        );
      };

      export default TransactionForm;