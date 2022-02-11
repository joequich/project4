import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import env from '../../common/config/env.config';
import { IJwt } from '../../interfaces/jwt.interface';
import { hashSync } from '../../common/helpers/bcrypt';

const jwtAccessSecret = env.JWT.ACCESS_SECRET_KEY || '';

class JwtMiddleware {
    constructor(private readonly usersService: IUsersService) {}

    validateJWT(req: Request, res: Response, next: NextFunction) {
        console.log('boyd',req.body)
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).json({ message: 'No token was found in request'});
                } else {
                    res.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtAccessSecret
                    ) as IJwt;
                    return next();
                }
            } catch (error) {
                return res.status(403).json({ status: 403, message: 'Invalid Token' });
            }
        } else {
            return res.status(401).json({
                 message: 'No token was found in request'
            });
        }
    }

    validateRefreshToken = async ( req: Request, res: Response, next: NextFunction ) => {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).json({ message: 'No token was found in request'});
                } else {
                    res.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtAccessSecret
                    ) as IJwt;
                    return next();
                }
            } catch (error) {
                console.log('Refresh Token exist, but there is an error ', error)
                console.log('Cookie with refresh token ', req.cookies.Refresh)
                return res.status(403).json({ status: 403, message: 'Invalid Token' });
            }
        } else {
            return res.status(401).json({
                message: 'No token was found in request'
            });
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
