import React, { useState } from 'react';
import { CustomFormEvent } from '../types/events';
import { ItemType } from '../types/item';
import postObject from '../api/postObject';
import { Button, Container, TextField, MenuItem, Stack, InputAdornment } from '@mui/material';
import itemHandleFormSubmit from './itemHandleFormSubmit';


const AddItemForm: React.FC<{ getItemHandler: () => void; items: ItemType[] }> = ({ getItemHandler, items }) => {

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

  const handleFormSubmit = async (event: CustomFormEvent) => {
    event.preventDefault();
    const response = itemHandleFormSubmit(items, formData)
    if (response) {
      alert(response)
      return
    }
    postObject('item', formData, getItemHandler);
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
