import { Router } from "express";
import { body } from 'express-validator';
import { Roles } from '../constants';
import { validateFields } from '../common/middlewares/validate-fields';
import ProductsService from "./services/products.service";
import RoleService from "../roles/services/roles.service";
import UsersService from "../users/services/users.service";
import ProductsMiddleware from "./middlewares/products.middleware";
import JwtMiddleware from "../auth/middlewares/jwt.middleware";
import RolesMiddleware from "../roles/middlewares/roles.middleware";
import ProductsController from "./controllers/products.controller";
import UploadsService from "../common/services/uploads.service";

const route = Router();
const usersService = new UsersService();
const uploadsService = new UploadsService();
const productsService = new ProductsService(uploadsService);
const roleService = new RoleService();

const jwtMiddleware = new JwtMiddleware(usersService);
const productsMiddleware = new ProductsMiddleware(productsService);
const rolesMiddleware = new RolesMiddleware(roleService);

const productsController = new ProductsController(productsService);

const ProductsRoute = (app: Router) => {
    app.use('/products', route);

    // create a product - private - anyone with a valid token
    route.post('/', [
        jwtMiddleware.validateJWT,
        body('name', 'Invalid name value').not().isEmpty(),
        validateFields,
    ], productsController.createProduct)

    // get all products - public
    route.get('/', productsController.listProducts);

    // get all products - public
    route.get('/:id', [
        jwtMiddleware.validateJWT,
    ], productsController.getProductById);

    // update - private - anyone with a valid token
    route.put('/:id', [
        jwtMiddleware.validateJWT,
        body('name', 'Invalid name value').not().isEmpty(),
        body('image', 'Invalid image value'),
        body('description', 'Invalid name value').not().isEmpty(),
        body('price', 'Invalid name value').not().isEmpty(),
        body('stock', 'Invalid name value').not().isEmpty(),
        validateFields,
        productsMiddleware.validateIfProductExists,
    ], productsController.put);

    // update (patch) - private - anyone with a valid token
    route.patch('/:id', [
        jwtMiddleware.validateJWT,
        body('name', 'Invalid name value').isString().optional(),
        body('image', 'Invalid image value').optional(),
        body('description', 'Invalid name value').isString().optional(),
        body('price', 'Invalid name value').isNumeric().optional(),
        body('stock', 'Invalid name value').isNumeric().optional(),
        validateFields,
        productsMiddleware.validateIfProductExists,
    ], productsController.put);

    // delete a product
    route.delete('/:id', [
        jwtMiddleware.validateJWT,
        rolesMiddleware.hasRole(Roles.ADMIN),
    ], productsController.removeProduct)
}

export default ProductsRoute;
