export interface IProduct {
    _id: string;
    name: string;
    image?: string;
    description?: string;
    price: string;
    stock: string;
    user: string;
}
export interface IProductCrud {
    name: string;
    image?: File;
    description?: string;
    price: string;
    stock: string;
}