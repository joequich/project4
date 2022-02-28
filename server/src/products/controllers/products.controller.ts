import { Request, Response } from 'express';
import { IProductsService } from '../../interfaces/product.interface';

export default class ProductsController {
    constructor(private readonly productsService: IProductsService) { }

    createProduct = async (req: Request, res: Response) => {
        try {
            const { userId } = res.locals.jwt;
            if (req.file?.path) req.body.image = req.file.path;
            req.body.user = userId;
            const product = await this.productsService.create(req.body);
            return res.status(201).json(product);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(409).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    listProducts = async (req: Request, res: Response) => {
        const page = req.query.page ? Number(req.query.page) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 10;

        try {
            const products = await this.productsService.list(page, limit);

            return res.status(200).json(products);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    getProductById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const product = await this.productsService.readById(id);
            return res.status(200).json(product);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    patch = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwt;
        if (req.file?.path) req.body.image = req.file.path;
        req.body.user = userId;
        try {
            const product = await this.productsService.updateById(id, req.body);
            return res.status(200).json(product);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwt;
        if (req.file?.path) req.body.image = req.file.path;
        req.body.user = userId;
        try {
            const product = await this.productsService.updateById(id, req.body);
            return res.status(200).json(product);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    removeProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.productsService.deleteById(id);
            return res.status(200).json({ product: id, });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };
}