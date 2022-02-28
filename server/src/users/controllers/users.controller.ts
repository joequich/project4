import { Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import { generateSalt, hashSync } from '../../common/helpers/bcrypt';

export default class UsersController {
    constructor(private readonly userService: IUsersService) {}

    listUsers = async (req: Request, res: Response) => {
        const page = req.query.page ? Number(req.query.page) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 10;

        try {
            const users = await this.userService.list(page, limit);
            return res.status(200).json(users);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const user = await this.userService.readById(id);
            return res.status(200).json(user);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    createUser = async (req: Request, res: Response) => {
        const salt = generateSalt();
        req.body.password = hashSync(req.body.password, salt);
        try {
            const user = await this.userService.create(req.body);
            return res.status(201).json(user);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(409).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    patch = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (req.body.password) {
            const salt = generateSalt();
            req.body.password = hashSync(req.body.password, salt);
        }
        const { _id, google, ...resto } = req.body;
        try {
            const user = await this.userService.updateById(id, resto);
            return res.status(200).json(user);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const salt = generateSalt();
        req.body.password = hashSync(req.body.password, salt);
        const { _id, google, ...resto } = req.body;
        try {
            const user = await this.userService.updateById(id, resto);
            return res.status(200).json(user);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    removeUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.userService.deleteById(id);
            return res.status(200).json({ user: id });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };
}
