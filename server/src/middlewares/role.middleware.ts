import { NextFunction, Request, Response } from "express";
import RoleService from "../services/role.service";
export default class RolesMiddleware {
    constructor(private readonly roleService: RoleService) {}

    isRoleValid = async(req: Request, res: Response, next: NextFunction) => {
        const role = req.body.role || '';
        const existRole = await this.roleService.getRole(role);
        if(existRole || role === '') {
            next();
        } else {
            res.status(400).json({ error: `The role ${role} is not registered in the DB` });
        }
    }
}
