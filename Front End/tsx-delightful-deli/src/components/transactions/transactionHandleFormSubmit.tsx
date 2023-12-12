import { transactionLogic } from "./TransactionLogic";
import { ItemType } from "../types/item";

const transactionHandleFormSubmit = (
    items: ItemType[],
    formData: {
        count: number,
        direction: string,
        item_id: string,
        }
    ) => {

    console.log("Attempt to post transaction:", formData)

    const validationError = transactionLogic(formData, items.find((item) => (item.id === parseInt(formData.item_id, 10))));

    if (validationError) {
    return validationError;
    }
    return undefined
}

export default transactionHandleFormSubmit