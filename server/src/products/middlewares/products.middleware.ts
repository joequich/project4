import { NextFunction, Request, Response } from "express";
import { IProductsService } from "../../interfaces/product.interface";

export default class ProductsMiddleware {
    constructor(private readonly productsService: IProductsService) {}

    validateIfProductExists = async ( req: Request, res: Response, next: NextFunction ) => {
        const id = req.params.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error(`Id does not exist ${id}`);
        }
        
        const product = await this.productsService.readById(id);
        if (product) {
            return next();
        } else {
            return res
                .status(404)
                .json({
                    status: 404,
                    message: `Product ${id} not found`
                });
        }
    };
}