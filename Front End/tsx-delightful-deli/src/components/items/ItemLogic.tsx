export function itemValidator(
    formData: {
        name: string;
        price: string;
        category: string;
    }
): string | undefined {
    if (
        formData.name === "Input Item Name" ||
        formData.name.trim() === "" ||
        formData.price === null ||
        formData.price === '0' ||
        formData.price === ''
        ) {

        return ("Please enter an item name and price!") ;
    }
    return undefined

}
