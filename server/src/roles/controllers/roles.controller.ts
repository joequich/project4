import { Request, Response } from 'express';
import { IRoleService } from '../../interfaces/role.interface';

export default class RolesController {
    constructor(private readonly roleService: IRoleService) {}

    createRole = async (req: Request, res: Response) => {
        try {
            const role = await this.roleService.create({ role: req.body.role });
            return res.status(200).json(role);
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
