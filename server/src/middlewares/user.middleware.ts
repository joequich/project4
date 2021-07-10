import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user.interface";
export default class UsersMiddleware {
    constructor(private readonly userService: IUserService) {}

    validateIfEmailExist = async(req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const existEmail = await this.userService.getUserByEmail(email);
        if(existEmail) {
            return res.status(400).json({ error: `User email ${email} already exists`});
        } else {
            return next();
        }
    }

    validateIfEmailBelongToUser = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.getUserByEmail(req.body.email);
        if(user && user._id === req.params.id) {
            return res.status(400).json({ error: 'Invalid Email'});
        } else {
            return next();
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async(req: Request, res: Response, next: NextFunction) => {
        if (req.body.email) {
            return this.validateIfEmailBelongToUser(req, res, next);
        } else {
            return next();
        }
    }

    validateIfUserExists = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.readById(req.params.id);
        if (user) {
            res.locals.user = user;
            console.log(res.locals.user);
            return next();
        } else {
            return res.status(404).json({ error: `User ${req.params.userId} not found` });
        }
    }

    userCannotChangeRole = (req: Request, res: Response, next: NextFunction) => {
        if ('role' in req.body && req.body.role !== res.locals.user.role) {
            return res.status(400).json({ status: 400, message: 'User cannot change role'});
        } else {
            return next();
        }
    }
}
