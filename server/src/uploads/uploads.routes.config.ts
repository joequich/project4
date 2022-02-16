import { Router } from "express";
import { body } from 'express-validator';
import { Roles } from '../constants';
import { validateFields } from '../common/middlewares/validate-fields';
import upload from "../common/middlewares/multer-upload";
import RoleService from "../roles/services/roles.service";
import UsersService from "../users/services/users.service";
import JwtMiddleware from "../auth/middlewares/jwt.middleware";
import RolesMiddleware from "../roles/middlewares/roles.middleware";
import UploadsController from "./controllers/uploads.controller";

import UploadsService from "../common/services/uploads.service"

const route = Router();
const usersService = new UsersService();
const roleService = new RoleService();

const jwtMiddleware = new JwtMiddleware(usersService);
const rolesMiddleware = new RolesMiddleware(roleService);

const uploadsService = new UploadsService();
const uploadsController = new UploadsController(uploadsService)


const ProductsRoute = (app: Router) => {
    app.use('/uploads', route);

    // create a product - private - anyone with a valid token
    route.post('/', [
        jwtMiddleware.validateJWT,
        upload.single('file'),
        // body('name', 'Invalid name value').not().isEmpty(),
        // validateFields,
    ], uploadsController.uploadSingleFile)

}

export default ProductsRoute;
