import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import { compareSync } from '../../common/helpers/bcrypt';

class AuthMiddleWare {
    constructor(private readonly usersService: IUsersService) {}

    verifyUserPassword = async ( req: Request, res: Response, next: NextFunction ) => {
        const user = await this.usersService.getUserCredentialsByEmail(
            req.body.email
        );
        if (user) {
            const passHash = user.password;
            if (compareSync(req.body.password, passHash)) {
                req.body = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                };
                console.log(req.body);
                return next();
            }
        }
        return res
            .status(400)
            .json({
                status: 400,
                message: 'Invalid email and/or password'
            });
    };
}

export default AuthMiddleWare;
