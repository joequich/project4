import { Router } from 'express';
import role from './role.routes';
import user from './users.routes';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	user(app);
	role(app);

	return app
}