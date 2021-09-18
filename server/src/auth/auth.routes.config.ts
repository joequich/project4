import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import UserService from '../users/services/users.service';
import AuthMiddleWare from './middleware/auth.middleware';
import JwtMiddleware from './middleware/jwt.middleware';
import { validateFields } from '../common/middlewares/validate-fields';
import AuthController from './controllers/auth.controller';

const route = Router();
const userService = new UserService();
const authController = new AuthController();
const authMiddleware = new AuthMiddleWare(userService);
const jwtMiddleware = new JwtMiddleware(userService);

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', [
        body('email', 'Email is not valid').isEmail(),
        body('password', 'Password is not valid').isString(),
        validateFields,
        authMiddleware.verifyUserPassword,
    ], authController.generateJWT);

    route.post('/refresh-token', [
        jwtMiddleware.validateJWT,
        jwtMiddleware.validateBodyRefresh,
        jwtMiddleware.validateRefreshToken,
        authController.generateJWT
    ]);

}