import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { setPassword } from '../helpers/bcrypt';

export default class UsersController {
    constructor(private readonly userService: UserService) {}

    listUsers = async(req: Request, res: Response) => {
        const page = req.params.page ? Number(req.params.page) : 0;
        const limit = req.params.limit ? Number(req.params.limit) : 10;

        try {
            const users = await this.userService.list({}, page, limit);
            return res.status(200).json({ status: 200, data: users, message: 'Succesfully Users List' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    getUserById = async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const user = await this.userService.readById(id);
            return res.status(200).json({ status: 200, data: user, message: 'Succesfully User List' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    createUser = async(req: Request, res: Response) => {
        console.log('controller',req.body);
        req.body.password = setPassword(req.body.password);
        try {
            const user = await this.userService.create(req.body);
            return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Saved" });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    patch = async(req: Request, res: Response) => {
        const { id } = req.params;
        if (req.body.password) {
            req.body.password = setPassword(req.body.password);
        }
        const { _id, google, ...resto } = req.body;
        try {
            const user = await this.userService.updateById(id, resto);
            return res.status(200).json({ status: 200, data: user, message: 'Succesfully User Updated' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    put = async(req: Request, res: Response) => {
        const { id } = req.params;
        req.body.password = setPassword(req.body.password);
        const { _id, google, ...resto } = req.body;
        try {
            const user = await this.userService.updateById(id, resto);
            return res.status(200).json({ status: 200, data: user, message: 'Succesfully User Updated' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    removeUser = async(req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await this.userService.deleteById(id);
            return res.status(200).json({ status: 200, data: user, message: 'Succesgully User Deleted'})
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}