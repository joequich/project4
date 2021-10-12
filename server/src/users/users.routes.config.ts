import { Router } from 'express';
import { check } from 'express-validator';
import UsersController from './controllers/users.controller';
import UsersService from './services/users.service';
import UsersMiddleware from './middlewares/users.middleware';
import RoleService from '../roles/services/roles.service';
import { validateFields } from '../common/middlewares/validate-fields';
import RolesMiddleware from '../roles/middlewares/roles.middleware';
import { Roles } from '../constants';
import JwtMiddleware from '../auth/middlewares/jwt.middleware';

const route = Router();
const usersService = new UsersService();
const roleService = new RoleService();

const usersController = new UsersController(usersService);

const usersMiddleware = new UsersMiddleware(usersService);
const rolesMiddleware = new RolesMiddleware(roleService);
const jwtMiddleware = new JwtMiddleware(usersService);

export default (app: Router) => {
    app.use('/users', route);

    route.get('/', usersController.listUsers);
    route.post('/', [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        validateFields,
        usersMiddleware.validateIfEmailExist,
        rolesMiddleware.isRoleValid,
    ], usersController.createUser);
    route.patch('/:id', [
        check('username', 'Username is required').isString().optional(),
        check('email', 'Email is not valid').isEmail().optional(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }).optional(),
        check('image', 'Image is required').isString().optional(),
        check('role','Role is required').isString().optional(),
        check('status','Status is required').isBoolean().optional(),
        check('google','Google is required').isBoolean().optional(),
        validateFields,
        usersMiddleware.validatePatchEmail,
        usersMiddleware.userCannotChangeRole,
        rolesMiddleware.hasRole(Roles.USER),
    ], usersController.patch);
    route.put('/:id', [
        check('username', 'Username is required').isString(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        check('image', 'Image is required'),
        check('role','Role is required'),
        check('status','Status is required'),
        check('google','Google is required'),
        validateFields,
        usersMiddleware.validateIfEmailBelongToUser,
        usersMiddleware.userCannotChangeRole,
        rolesMiddleware.hasRole(Roles.USER),
    ], usersController.put);
    route.delete('/:id', [
        usersMiddleware.validateIfUserExists,
        jwtMiddleware.validateJWT,
        rolesMiddleware.onlySameUserOrAdmin
    ], usersController.removeUser);
};
