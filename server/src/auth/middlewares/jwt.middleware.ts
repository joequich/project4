import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import env from '../../common/config/env.config';
import { IJwt } from '../../interfaces/jwt.interface';

const jwtAccessSecret = env.JWT.ACCESS_SECRET_KEY || '';
const jwtRefreshSecret = env.JWT.REFRESH_SECRET_KEY || '';

class JwtMiddleware {
    constructor(private readonly usersService: IUsersService) {}

    validateJWT(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const authParts = authHeader?.split(' ');

        if (authParts?.length !== 2) {
            return res.status(401).json({
                message: 'No authorization token was found in request'
            });
        }

        if(!/^Bearer$/i.test(authParts[0])) {
            return res.status(401).json({
                message: 'Bad format, authorization format is: Bearer [token]'
            });
        }

        // it could be a decode step to verify the algorithm type

        try {
            res.locals.jwt = jwt.verify( authParts[1], jwtAccessSecret ) as IJwt;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }

    validateRefreshToken = async ( req: Request, res: Response, next: NextFunction ) => {
        if(!req.cookies.Refresh) {
            return res.status(401).send({
                message: 'Don\'t exits refresh token'
            });
        }

        try {
            res.locals.jwt = jwt.verify( req.cookies.Refresh, jwtRefreshSecret) as IJwt;
            const user = await this.usersService.getUserCredentialsByEmail( res.locals.jwt.email);
            
            if(!user){
                return res.status(401).json({ message: 'Invalid Refresh Token' });
            }

            req.body = {
                userId: user._id,
                email: user.email,
                role: user.role,
            };
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
}

export default JwtMiddleware;
