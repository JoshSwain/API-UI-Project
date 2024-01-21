import React, { useState } from 'react';
import { CustomFormEvent } from '../../types/events';
import { ItemContextType } from '../../types/item';
import saveObject from '../api/saveObject';
import { Button, Container, TextField, MenuItem, Stack, InputAdornment } from '@mui/material';
import itemHandleFormSubmit from './itemHandleFormSubmit';
import { ItemContext } from '../../context/ItemContext';


const AddItemForm: React.FC<{}> = () => {
  //Inheriting Item state and Item Fetcher from item context
  const {items, fetchItemHandler} = React.useContext(ItemContext) as ItemContextType

  //Default form data on UI
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'sandwiches',
  });

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Runs form data through item creation validation logic and alerts if an error is found before submitting and saving.
  const handleFormSubmit = async (event: CustomFormEvent) => {
    event.preventDefault();
    const response = itemHandleFormSubmit(items, formData)
    if (response) {
      alert(response)
      return
    }
    //Custom save function managed in components/api/saveObject
    saveObject('item', formData, fetchItemHandler);
  };

  return (
    <Container>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <Stack direction='row' spacing={2}>

            <TextField
              label="Item Name"
              type="text"
              id="name"
              name="name"
              placeholder="Input Item Name"
              onChange={handleInputChange}
              value={formData.name}
              fullWidth
              required
              autoCorrect='False'
            />

            <TextField

              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
              fullWidth
              required
              select={true}
            >
              <MenuItem value="sandwiches">Sandwich</MenuItem>
              <MenuItem value="beverages">Beverage</MenuItem>
            </TextField>

            <TextField
              type="number"
              id="price"
              name="price"
              onChange={handleInputChange}
              value={formData.price}
              fullWidth
              required
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }}
            />
            </Stack>
            <Button type="submit" variant="outlined">
              Submit
            </Button>

          </Stack>

        </form>

    </Container>
  );
};

export default AddItemForm;
