import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UsersController {
    constructor(private readonly userService: UserService) {}

    async get(req: Request, res: Response) {
        const page = req.params.page ? Number(req.params.page) : 1;
        const limit = req.params.limit ? Number(req.params.limit) : 10;

        try {
            const users = await this.userService.get({}, page, limit);
            return res.status(200).json({ status: 200, data: users, message: 'Succesfully Users Saved' });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }

    async save(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const users = await this.userService.save({ name })
            return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Saved" });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}