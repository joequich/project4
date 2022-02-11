import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import env from '../../common/config/env.config';
import { IJwt } from '../../interfaces/jwt.interface';

const jwtAccessSecret = env.JWT.ACCESS_SECRET_KEY || '';

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
            console.log('Refresh Token exist, but there is an error ', error)
            console.log('Cookie with refresh token ', req.cookies.Refresh)
            return res.status(401).json({ message: 'Invalid Token' });
        }

        // const user = await this.usersService.getUserCredentialsByEmail(
        //     res.locals.jwt.email
        // );
        // const salt = res.locals.jwt.refreshKey;
        // const hash = hashSync(res.locals.jwt.userId + jwtSecretKey, salt);

        // if (hash === req.body.refreshToken && user) {
        //     req.body = {
        //         userId: user._id,
        //         email: user.email,
        //         role: user.role,
        //     };
        //     return next();
        // } else {
        //     return res
        //         .status(400)
        //         .json({ 
        //             status: 400,
        //             message: 'Invalid refresh token',
        //         });
        // }
    };
}

export default JwtMiddleware;
