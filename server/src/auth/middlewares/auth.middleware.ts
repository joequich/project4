import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import { compareSync } from '../../common/helpers/bcrypt';
import { OAuth2Client } from 'google-auth-library';
import env from '../../common/config/env.config';

class AuthMiddleWare {
    constructor(private readonly usersService: IUsersService) {}

    validateBodyRequest = async ( req: Request, res: Response, next: NextFunction ) => {
        if (req.body && req.body.email, req.body.password) {
            return next();
        } else {
            return res.status(400).json({
                message: 'Mandatory fields are missing: email and password',
            });
        }        
    }

    verifyUserPassword = async ( req: Request, res: Response, next: NextFunction ) => {
        const user = await this.usersService.getUserCredentialsByEmail(req.body.email);
        if (user) {
            const passHash = user.password;
            if (compareSync(req.body.password, passHash)) {
                req.body = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                };
                return next();
            } else {
                return res .status(400).json({
                    message: 'Invalid email and/or password'
                });
            }
        }
        return res.status(400).json({
            message: 'Invalid email and/or password'
        });
    };

    verifyUserGoogle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idToken } = req.body;
            const client = new OAuth2Client(env.GOOGLE.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken,
                audience: env.GOOGLE.CLIENT_ID,
            });
    
            const payload = ticket.getPayload();
    
            req.body = {
                username: payload?.name,
                email: payload?.email,
                image: payload?.picture
            }
            return next();
        } catch{
            return res.status(400).json({
                message: 'Invalid google token'
            });
        }
    }
}

export default AuthMiddleWare;
