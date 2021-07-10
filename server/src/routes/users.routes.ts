import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import UsersController from '../controllers/users.controller';
import UserService from '../services/user.service';
import UsersMiddleware from '../middlewares/user.middleware';
import RoleService from '../services/role.service';
import { validateFields } from '../middlewares/validate-fields';
import RolesMiddleware from '../middlewares/role.middleware';

const route = Router();
const userService = new UserService();
const roleService = new RoleService();

const userController = new UsersController(userService);

const userMiddleware = new UsersMiddleware(userService);
const roleMiddleware = new RolesMiddleware(roleService);

export default (app: Router) => {
    app.use('/users', route);

    route.get('/',(req: Request, res: Response) => userController.listUsers(req, res));
    route.post('/', [
        body('username', 'Username is required').not().isEmpty(),
        body('email', 'Email is not valid').isEmail(),
        body('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        validateFields,
        userMiddleware.validateIfEmailExist,
        roleMiddleware.isRoleValid,
    ], userController.createUser);
    route.patch('/:id', (req: Request, res: Response) => userController.patch(req, res));
    route.put('/:id', (req: Request, res: Response) => userController.put(req, res));
    route.delete('/:id', (req: Request, res: Response) => userController.removeUser(req, res));
};