import { Request, Response } from 'express';
import RoleService from '../services/role.service';

export default class RolesController {
    constructor(private readonly roleService: RoleService) {}

    async createRole(req: Request, res: Response) {
        try {
            const role = await this.roleService.create({ role: req.body.role })
            return res.status(200).json({ status: 200, data: role, message: "Succesfully Role Saved" });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}