import { ItemType } from "../../types/item";

export function transactionLogic(
    formData: {
      count: number,
      direction: string,
      item_id: string,
      },
    selectedInventory: ItemType | undefined
  ): string | undefined {
    console.log(selectedInventory)
    if (!selectedInventory) {
      return "Selected item not found.";
    }
    if (!formData.count ) {
      return "Please enter a valid count."
    }

    if (formData.count < 0) {
      return "Please enter a count greater than 0"
    }

    if (formData.direction === 'Sale' && formData.count > selectedInventory.inventory[0].quantity) {
      return "Insufficient inventory for Transaction, current quantity: " + selectedInventory.inventory[0].quantity;
    }

    return undefined;
  }