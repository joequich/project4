import { Router } from "express";
import { body } from 'express-validator';
import ProductsController from "./controllers/products.controller";
import ProductsService from "./services/products.service";
import { validateFields } from '../common/middlewares/validate-fields';
import JwtMiddleware from "../auth/middlewares/jwt.middleware";
import UsersService from "../users/services/users.service";
import ProductsMiddleware from "./middlewares/products.middleware";

const route = Router();
const usersService = new UsersService();
const productsService = new ProductsService();

const jwtMiddleware = new JwtMiddleware(usersService);
const productsMiddleware = new ProductsMiddleware(productsService);

const productsController = new ProductsController(productsService);

const ProductsRoute = (app: Router) => {
    app.use('/products', route);

    // create a product - private - anyone with a valid token
    route.post('/', [
        jwtMiddleware.validateJWT,
        body('name', 'Invalid name value').not().isEmpty(),
        validateFields
    ], productsController.createProduct)

    // get all products - public
    route.get('/', productsController.listProducts);


    // update - private - anyone with a valid token
    route.put('/:id', [
        jwtMiddleware.validateJWT,
        body('name', 'Invalid name value').not().isEmpty(),
        productsMiddleware.validateIfProductExists,
    ], productsController.put);

    
}

export default ProductsRoute;
