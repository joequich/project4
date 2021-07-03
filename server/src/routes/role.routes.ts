import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields';

import RolesController from '../controllers/roles.controller';
import RoleService from '../services/role.service';

const route = Router();
const RoleServiceInstance = new RoleService();
const RoleControllerInstance = new RolesController(RoleServiceInstance);

export default (app: Router) => {
    app.use('/roles', route);

    route.post('/', [
        body('role', 'Role is required').not().isEmpty(),
        validateFields
    ], RoleControllerInstance.createRole);
};