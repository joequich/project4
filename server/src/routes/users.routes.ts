
import { Router, Request, Response} from 'express';
import UsersController from '../controllers/users.controller';
import UserService from '../services/user.service';

const route = Router();

const UserControllerInstance = new UsersController(new UserService());

export default (app: Router) => {
  app.use('/users', route);

  route.get('/', (req: Request, res: Response) => UserControllerInstance.get(req, res));
  route.post('/', (req: Request, res: Response) => UserControllerInstance.save(req, res));
};