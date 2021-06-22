import { Request, Response } from 'express';
import { setPassword } from '../helpers/bcrypt';
import UserService from '../services/user.service';

export default class UsersController {
    constructor(private readonly userService: UserService) {}

    async read (req: Request, res: Response) {
        const page = req.params.page ? Number(req.params.page) : 0;
        const limit = req.params.limit ? Number(req.params.limit) : 10;

        try {
            const users = await this.userService.read({}, page, limit);
            return res.status(200).json({ status: 200, data: users, message: 'Succesfully Users Saved' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    async create (req: Request, res: Response) {
        const { username, email, password } = req.body;
        try {
            const user = await this.userService.create({ username, email, password: setPassword(password) })
            return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Saved" });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    async update (req: Request, res: Response) {
        const { id } = req.params;
        if (req.body.password) {
            req.body.password = setPassword(req.body.password);
        }
        const { _id, google, ...resto } = req.body;
        try {
            const user = await this.userService.update(id, resto);
            return res.status(200).json({ status: 200, data: user, message: 'Succesfully User Updated' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    async delete (req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await this.userService.delete(id);
            return res.status(200).json({ status: 200, data: user, message: 'Succesgully User Deleted'})
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}