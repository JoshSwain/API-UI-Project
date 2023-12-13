import React, { useState } from 'react';
import {
  CustomFormEvent,
} from '../../types/events';
import { ItemType } from '../../types/item';
import postObject from '../api/postObject';
import {
  Button,
  Container,
  Select,
  MenuItem,
  TextField,
  Stack,
} from '@mui/material';
import transactionHandleFormSubmit from './transactionHandleFormSubmit';

const TransactionForm: React.FC<{
  items: ItemType[],
  getTransactionHandler: () => void,
  getItemHandler: () => void}> = ({ items, getTransactionHandler, getItemHandler }) => {
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

    const handleFormSubmit = async (event: CustomFormEvent) => {
        event.preventDefault();
        const response = transactionHandleFormSubmit(items, formData)
        if (response) {
          alert(response)
          return
        }
        postObject('transaction', formData, getTransactionHandler, getItemHandler)

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