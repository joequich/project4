import { NextFunction, Request, Response } from 'express';
import { IRoleService } from '../../interfaces/role.interface';
import { Roles } from '../../constants';
export default class RolesMiddleware {
    constructor(private readonly roleService: IRoleService) {}

    isRoleValid = async (req: Request, res: Response, next: NextFunction) => {
        const role = req.body.role || '';
        const existRole = await this.roleService.getRole(role);
        if (existRole || role === '') {
            next();
        } else {
            res.status(400).json({
                status: 400,
                message: 'Invalid Role',
                errors: [{ value: role, reason: 'Not registered' }]
            });
        }
    };

    hasRole(...roles: Roles[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const userRole: Roles = res.locals.jwt.role;
                if (roles.includes(userRole)) {
                    return next();
                } else {
                    return res.status(403).json({
                        status: 403,
                        message: 'Invalid Role',
                        errors: [
                            {
                                value: `${userRole}`,
                                reason: `The service requires one of these roles ${roles}`,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
    }

    onlySameUserOrAdmin(req: Request, res: Response, next: NextFunction) {
        const userRole: Roles = res.locals.jwt.role;
        if (
            req.params &&
            req.params.id &&
            req.params.id === res.locals.jwt.userId
        ) {
            return next();
        } else {
            if (userRole === Roles.ADMIN) {
                return next();
            } else {
                return res.status(403).json({
                    status: 403,
                message: 'You need permissions, cannot do this',
                });
            }
        }
    }
}
