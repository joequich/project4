import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user.interface";
export default class UsersMiddleware {
    constructor(private readonly userService: IUserService) {}

    validateIfEmailExist = async(req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const existEmail = await this.userService.getUserByEmail(email);
        if(existEmail) {
            res.status(400).json({ error: `User email ${email} already exists`});
        } else {
            next();
        }
    }

    validateIfEmailBelongToUser = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.getUserByEmail(req.body.email);
        if(user && user._id === req.params.id) {
            res.status(400).json({ error: 'Invalid Email'});
        } else {
            next();
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async(req: Request, res: Response, next: NextFunction) => {
        if (req.body.email) {
            this.validateIfEmailBelongToUser(req, res, next);
        } else {
            next();
        }
    }

    validateIfUserExists = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.readById(req.params.id);
        if (user) {
            next();
        } else {
            res.status(404).json({ error: `User ${req.params.userId} not found` });
        }
    }

    extractUserId = async(req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.userId;
        next();
    }
}
