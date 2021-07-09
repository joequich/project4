import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import UserService from '../services/user.service';
import AuthMiddleWare from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const route = Router();
const userService = new UserService();
const authController = new AuthController();
const authMiddleware = new AuthMiddleWare(userService);

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', [
        body('email', 'Email is not valid').isEmail(),
        body('password', 'Password is not valid').isString(),
        validateFields,
        authMiddleware.verifyUserPassword,
    ], authController.generateJWT);

}