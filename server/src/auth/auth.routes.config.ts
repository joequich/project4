import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import UserService from '../users/services/users.service';
import AuthMiddleWare from './middlewares/auth.middleware';
import JwtMiddleware from './middlewares/jwt.middleware';
import { validateFields } from '../common/middlewares/validate-fields';
import AuthController from './controllers/auth.controller';

const route = Router();
const userService = new UserService();
const authController = new AuthController(userService);
const authMiddleware = new AuthMiddleWare(userService);
const jwtMiddleware = new JwtMiddleware(userService);

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', [
        body('email', 'Invalid email value').isEmail(),
        body('password', 'Invalid string value').isString(),
        validateFields,
        authMiddleware.verifyUserPassword,
    ], authController.generateJWT);

    route.post('/google', [
        body('idToken', 'Invalid token value').not().isEmpty(),
        validateFields,
        authMiddleware.verifyUserGoogle,
    ], authController.signInGoogle);

    route.post('/refresh-token', [
        jwtMiddleware.validateJWT,
        jwtMiddleware.validateBodyRefresh,
        jwtMiddleware.validateRefreshToken,
        authController.generateJWT
    ]);

}