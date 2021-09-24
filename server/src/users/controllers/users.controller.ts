import { Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import { generateSalt, hashSync } from '../../common/helpers/bcrypt';

export default class UsersController {
    constructor(private readonly userService: IUsersService) {}

    listUsers = async (req: Request, res: Response) => {
        const page = req.params.page ? Number(req.params.page) : 0;
        const limit = req.params.limit ? Number(req.params.limit) : 10;

        try {
            const users = await this.userService.list(page, limit);
            return res
                .status(200)
                .json({
                    status: 200,
                    users,
                    message: 'Succesfully Users List',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
            }
        }
    };

    getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const user = await this.userService.readById(id);
            return res
                .status(200)
                .json({
                    status: 200,
                    user,
                    message: 'Succesfully User List',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
            }
        }
    };

    createUser = async (req: Request, res: Response) => {
        const salt = generateSalt();
        req.body.password = hashSync(req.body.password, salt);
        try {
            const user = await this.userService.create(req.body);
            return res
                .status(200)
                .json({
                    status: 200,
                    data: user,
                    message: 'Succesfully Users Saved',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
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
            return res
                .status(200)
                .json({
                    status: 200,
                    user,
                    message: 'Succesfully User Updated',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
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
            return res
                .status(200)
                .json({
                    status: 200,
                    user,
                    message: 'Succesfully User Updated',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
            }
        }
    };

    removeUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await this.userService.deleteById(id);
            return res
                .status(200)
                .json({
                    status: 200,
                    user,
                    message: 'Succesgully User Deleted',
                });
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .json({ status: 400, message: err.message });
            } else {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: 500, message: 'Unknow failure' });
            }
        }
    };
}
