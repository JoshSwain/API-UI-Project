
export type InputChangeBody = {
        name: string;
        price: string;
        category: string;
    }

export type InputChangeSetter = (value: React.SetStateAction<{
    name: string;
    price: string;
    category: string;
}>) => void
