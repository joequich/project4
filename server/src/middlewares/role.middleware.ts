import { NextFunction, Request, Response } from "express";
import { IRoleService } from "../interfaces/role.interface";
import { ROLES, DEFAULT_ROLE } from "../constants";
export default class RolesMiddleware {
    constructor(private readonly roleService: IRoleService) {}

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
