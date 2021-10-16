import { IProduct, IProductsService, IPostProduct, IPutProduct, IPatchProduct } from "../../interfaces/product.interface";
import Product from '../models/products.model';
import { destroyImage, uploadImage } from "../../common/services/cloudinary.service";

export default class ProductsService implements IProductsService {
    async create (data: IPostProduct): Promise<IProduct> {
        try {
            if(data.image){
                const image = await uploadImage(data.image);
                data.image = image;
            }
            const product = new Product(data);
            await product.save();
            return product;
        } catch (error){
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
        } catch {
            throw new Error('Error while paginating products');
        }
    }
    async readById (id: string): Promise<IProduct | null> {
        try {
            const product = await Product.findById(id).populate('user', 'username');
            return product;
        } catch {
            throw new Error('Error while reading a product');
        }
    }

    async getProductByName (name: string): Promise<IProduct | null> {
        try {
            const product = await Product.findOne({name});
            return product;
        } catch {
            throw new Error('Error while reading a user email');
        }
    }

    async updateById (id: string, data: IPutProduct | IPatchProduct): Promise<IProduct | null> {
        try {
            if(data.image){
                const product = await Product.findById(id);
                if(product?.image) await destroyImage(product.image);
                const image = await uploadImage(data.image);
                data.image = image;
            }
            const productUpdated = await Product.findByIdAndUpdate(id, {$set: data}, {new: true}).setOptions({upsert: true});
            return productUpdated;
        } catch {
            throw new Error('Error while updating a product');
        }
    }

    async deleteById (id: string): Promise<{ id: string; deleted: boolean } | null> {
        try {
            await Product.findByIdAndDelete(id);
            return { id, deleted: true };
        } catch {
            throw new Error('Error while deleting a product');
        }
    }
}