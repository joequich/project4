import { Router } from 'express';
import role from './roles/roles.routes.config';
import user from './users/users.routes.config';
import auth from './auth/auth.routes.config';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	user(app);
	role(app);
	auth(app);

	return app
}