import { Router } from 'express';
import roles from './roles/roles.routes.config';
import users from './users/users.routes.config';
import auth from './auth/auth.routes.config';
import products from './products/products.routes.config';
import uploads from './uploads/uploads.routes.config'

// guaranteed to get dependencies
export default () => {
	const app = Router();
	users(app);
	roles(app);
	auth(app);
	products(app);
	uploads(app);

	return app
}