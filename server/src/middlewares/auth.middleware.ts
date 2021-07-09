import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user.interface";
import { comparePassword } from '../helpers/bcrypt';

class AuthMiddleWare {
    constructor(private readonly userService: IUserService) {}

    verifyUserPassword = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.getUserCredentialsByEmail(req.body.email);
        if(user) {
            const passHash = user.password;
            if(comparePassword(req.body.password, passHash)) {
                req.body = {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                };
                console.log(req.body)
                return next();
            }    
        }
        return res.status(400).json({ status: 400, message: 'Invalid email and/or password' });
    }
}

export default AuthMiddleWare;