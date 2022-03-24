import { IProduct, IProductsService, IPostProduct, IPutProduct, IPatchProduct } from "../../interfaces/product.interface";
import Product from '../models/products.model';
import { IUploadsService } from "../../interfaces/uploads.interface";

export default class ProductsService implements IProductsService {
    constructor(private readonly uploadsService: IUploadsService) {}

    async create (data: IPostProduct): Promise<IProduct> {
        try {
            const product = new Product(data);
            await product.save();
            return product;
        } catch (error){
            console.log(error);
            throw new Error('Error while save products');
        }
    }

    async list (from: number, limit: number): Promise<{ products: IProduct[]; total: number; }> {
        try {
            const [ total, products ] = await Promise.all([
                Product.countDocuments(),
                Product.find()
                    .populate('user', 'username')
                    .skip(Number(from))
                    .limit(Number(limit))
            ]);
            return {
                products,
                total
            }
        } catch(error) {
            console.log(error);
            throw new Error('Error while paginating products');
        }
    }
    async readById (id: string): Promise<IProduct | null> {
        try {
            const product = await Product.findById(id).populate('user', 'username');
            return product;
        } catch(error) {
            console.log(error);
            throw new Error('Error while reading a product');
        }
    }

    async getProductByName (name: string): Promise<IProduct | null> {
        try {
            const product = await Product.findOne({name});
            return product;
        } catch(error) {
            console.log(error);
            throw new Error('Error while reading a user email');
        }
    }

    async updateById (id: string, data: IPutProduct | IPatchProduct): Promise<IProduct | null> {
        try {
            if(data.image){
                const product = await Product.findById(id);
                if(product?.image) await this.uploadsService.destroyImage(product.image);
            }
            const productUpdated = await Product.findByIdAndUpdate(id, {$set: data}, {new: true}).setOptions({upsert: true});
            return productUpdated;
        } catch(error) {
            console.log(error);
            throw new Error('Error while updating a product');
        }
    }

    async deleteById (id: string): Promise<{ id: string; deleted: boolean } | null> {
        try {
            await Product.findByIdAndDelete(id);
            return { id, deleted: true };
        } catch(error) {
            console.log(error);
            throw new Error('Error while deleting a product');
        }
    }
}