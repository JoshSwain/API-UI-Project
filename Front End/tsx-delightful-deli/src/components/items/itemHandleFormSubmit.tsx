import { ItemType } from "../types/item";

const itemHandleFormSubmit = (
    items: ItemType[],
    formData: {
        name: string;
        price: number;
        category: string;
    }
) => {
    console.log('Attempt to post item:', formData);

    const itemWithSameName = items.find((item) => item.name === formData.name);
    if (
        formData.name === "Input Item Name" ||
        formData.name.trim() === "" ||
        formData.price === null ||
        formData.price === 0 ||
        formData.price < 0
        ) {
        return ("Please enter an item name and price!") ;
    }
    else if (itemWithSameName) {
      return 'An item already has that name, please choose another.';
    }
    return undefined
}

export default itemHandleFormSubmit