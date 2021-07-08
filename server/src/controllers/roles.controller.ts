import { Request, Response } from 'express';
import { IRoleService } from '../interfaces/role.interface';

export default class RolesController {
    constructor(private readonly roleService: IRoleService) {}

    createRole = async(req: Request, res: Response) => {
        try {
            const role = await this.roleService.create({ role: req.body.role })
            return res.status(200).json({ status: 200, data: role, message: "Succesfully Role Saved" });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}