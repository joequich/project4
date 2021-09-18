import { Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../common/middlewares/validate-fields';

import RolesController from '../roles/controllers/roles.controller';
import RoleService from '../roles/services/roles.service';

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