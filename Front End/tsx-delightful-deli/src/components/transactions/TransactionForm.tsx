import React, {useState} from 'react'
import { CustomChangeEvent, CustomFormEvent } from '../types/events';
import { ItemType } from '../types/item';
import { transactionLogic } from './TransactionLogic';
import postObject from '../api/postObject';

const TransactionForm: React.FC<{ items: ItemType[], getTransactionHandler: () => void, getItemHandler: () => void}> = ({ items, getTransactionHandler, getItemHandler }) => {
    const [ formData, setFormData] = useState( {
        count: 0,
        direction: 'Sale',
        item_id: '0',
    });

    const handleInputChange = (event: CustomChangeEvent) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    const handleFormSubmit = async (event: CustomFormEvent) => {
        event.preventDefault();
        console.log("Attempt to post transaction:", formData)

        const validationError = transactionLogic(formData, items.find((item) => (item.id === parseInt(formData.item_id, 10))));

        if (validationError) {
          alert(validationError);
          return;
        }
        postObject('transaction', formData, getTransactionHandler, getItemHandler)

        }
    

    return (
            <div className='container'>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-3 mt-3'>
                <label htmlFor='amount' className='form-label'>
                  Count
                </label>
                <input type='number' className='form-control' id='amount' name='count' onChange={handleInputChange} value={formData.count}/>
              </div>

              <div className='mb-3'>
                <label htmlFor='direction' className='form-label'>
                  Direction
                </label>
                <select className='form-select' id='direction' name='direction' onChange={handleInputChange} value={formData.direction}>
                  <option value='Sale'>Sell</option>
                  <option value='Restock'>Restock</option>
                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor='item_id' className='form-label'>
                  Item
                </label>
                <select
                  className='form-select'
                  id='item_id'
                  name='item_id'
                  onChange={handleInputChange}
                  value={formData.item_id}
                >
                  <option value=''>Select an Item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type='submit' className='btn btn-primary mb-3'>
                Submit
                </button>

            </form>
            </div>
        )
    }
export default TransactionForm;