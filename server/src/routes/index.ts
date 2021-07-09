import { Router } from 'express';
import role from './role.routes';
import user from './users.routes';
import auth from './auth.routes';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	user(app);
	role(app);
	auth(app);

	return app
}