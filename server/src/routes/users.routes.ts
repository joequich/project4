import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import UsersController from '../controllers/users.controller';
import UserService from '../services/user.service';
import UsersMiddleware from '../middlewares/user.middleware';
import RoleService from '../services/role.service';
import { validateFields } from '../middlewares/validate-fields';
import RolesMiddleware from '../middlewares/role.middleware';

const route = Router();
const UserServiceInstance = new UserService();
const RoleServiceInstance = new RoleService();
const UsersControllerInstance = new UsersController(UserServiceInstance);
const UsersMiddlewareInstance = new UsersMiddleware(UserServiceInstance);
const RolesMiddlewareInstance = new RolesMiddleware(RoleServiceInstance);

export default (app: Router) => {
    app.use('/users', route);

    route.get('/', (req: Request, res: Response) => UsersControllerInstance.listUsers(req, res));
    route.post('/', [
        body('username', 'Username is required').not().isEmpty(),
        body('email', 'Email is not valid').isEmail(),
        body('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        validateFields,
        UsersMiddlewareInstance.validateIfEmailExist,
        RolesMiddlewareInstance.isRoleValid,
    ], UsersControllerInstance.createUser);
    route.patch('/:id', (req: Request, res: Response) => UsersControllerInstance.patch(req, res));
    route.put('/:id', (req: Request, res: Response) => UsersControllerInstance.put(req, res));
    route.delete('/:id', (req: Request, res: Response) => UsersControllerInstance.removeUser(req, res));
};