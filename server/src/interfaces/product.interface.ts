export interface IProduct {
    _id?: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    stock: number;
    user: string;
}

export interface IPostProduct {
    name: string;
    image?: string;
    description?: string;
    price?: number;
    stock?: number;
    user: string;
}

export interface IPutProduct {
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    user: string;
}

export interface IPatchProduct {
    name?: string;
    image?: string;
    description?: string;
    price?: number;
    stock?: number;
    user?: string;
}

export interface IProductsService {
    create: ICreateProduct;
    list: (
        from: number,
        limit: number
    ) => Promise<{
        products: IProduct[];
        total: number;
    }>;
    readById: (id: string) => Promise<IProduct | null>;
    getProductByName: (name: string) => Promise<IProduct | null>;
    updateById: (
        id: string,
        data: IPutProduct | IPatchProduct
    ) => Promise<IProduct | null>;
    deleteById: (
        id: string
    ) => Promise<{ id: string; deleted: boolean } | null>;
}


export interface ICreateProduct {
    (data: IPostProduct): Promise<IProduct>;
}