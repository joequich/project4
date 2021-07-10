import { Router, Request, Response} from 'express';
import { check } from 'express-validator';
import UsersController from '../controllers/users.controller';
import UserService from '../services/user.service';
import UsersMiddleware from '../middlewares/user.middleware';
import RoleService from '../services/role.service';
import { validateFields } from '../middlewares/validate-fields';
import RolesMiddleware from '../middlewares/role.middleware';
import { Roles } from '../constants';
import JwtMiddleware from '../middlewares/jwt.middleware';

const route = Router();
const userService = new UserService();
const roleService = new RoleService();

const userController = new UsersController(userService);

const userMiddleware = new UsersMiddleware(userService);
const roleMiddleware = new RolesMiddleware(roleService);
const jwtMiddleware = new JwtMiddleware(userService);

export default (app: Router) => {
    app.use('/users', route);

    route.get('/', userController.listUsers);
    route.post('/', [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        validateFields,
        userMiddleware.validateIfEmailExist,
        roleMiddleware.isRoleValid,
    ], userController.createUser);
    route.patch('/:id', [
        check('username', 'Username is required').isString().optional(),
        check('email', 'Email is not valid').isEmail().optional(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }).optional(),
        check('image', 'Image is required').isString().optional(),
        check('role','Role is required').isString().optional(),
        check('status','Status is required').isBoolean().optional(),
        check('google','Google is required').isBoolean().optional(),
        validateFields,
        userMiddleware.validatePatchEmail,
        userMiddleware.userCannotChangeRole,
        roleMiddleware.hasRole(Roles.USER),
    ], userController.patch);
    route.put('/:id', [
        check('username', 'Username is required').isString(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        check('image', 'Image is required'),
        check('role','Role is required'),
        check('status','Status is required'),
        check('google','Google is required'),
        validateFields,
        userMiddleware.validateIfEmailBelongToUser,
        userMiddleware.userCannotChangeRole,
        roleMiddleware.hasRole(Roles.USER),
    ], userController.put);
    route.delete('/:id', [
        userMiddleware.validateIfUserExists,
        jwtMiddleware.validateJWT,
        roleMiddleware.onlySameUserOrAdmin
    ], userController.removeUser);
};
