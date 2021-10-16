import mongoose from "../../common/services/mongoose.service";
import { IProduct } from "../../interfaces/product.interface";


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name of product is required']},
    image: { type: String, required: false },
    description: { type: String },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

ProductSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.__v;
    return product;
}

export default mongoose.model<IProduct & mongoose.Document>('Product', ProductSchema)