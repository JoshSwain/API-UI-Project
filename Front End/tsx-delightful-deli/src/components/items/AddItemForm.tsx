import React, {useState} from 'react'
import { CustomChangeEvent, CustomFormEvent } from '../types/events';
import { ItemType } from '../types/item';
import { itemValidator } from './ItemLogic';
import postObject from '../api/postObject';

const AddItemForm: React.FC<{getItemHandler: () => void, items: ItemType[]}> = ({ getItemHandler, items }) => {

    const [formData, setFormData] = useState({
        name: "",
        price: '0',
        category: 'sandwiches'
        })

    const handleInputChange = (event: CustomChangeEvent) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    const itemWithSameName = items.find((item) => item.name === formData.name);

    const handleFormSubmit = async (event: CustomFormEvent) => {
        event.preventDefault();
        console.log("Attempt to  post item:", formData)
        const validationError = itemValidator(formData)
        if (validationError) {
          alert(validationError);
          return;
        } else if (itemWithSameName) {
            alert("An item already has that name, please choose another.")
            return;
        }
        postObject('item', formData, getItemHandler)


    }

    return (
        <div className='container'>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-3 mt-3'>
                <label htmlFor='name' className='form-label'>
                  Item Name
                </label>
                <input type='text' className='form-control' id='name' name='name' placeholder='Input Item Name' onChange={handleInputChange} value={formData.name}/>
              </div>

              <div className='mb-3'>
                <label htmlFor='category' className='form-label'>
                  Category
                </label>
                <select className='form-select' id='category' name='category' onChange={handleInputChange} value={formData.category}>
                  <option value='sandwiches'>Sandwich</option>
                  <option value='beverages'>Beverage</option>
                </select>
              </div>

              <div className='mb-3 mt-3'>
                <label htmlFor='price' className='form-label'>
                  Price
                </label>
                <input type='number' step={0.01}  className='form-control' id='price' name='price' onChange={handleInputChange} value={formData.price}/>
              </div>
              <button type='submit' className='btn btn-primary mb-3'>
                Submit
                </button>

            </form>
            </div>
        )
    }
export default AddItemForm;