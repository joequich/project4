import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';
import { env } from '../config/index';
import { IJwt } from "../interfaces/jwt.interface";
import { hashSync } from "../helpers/bcrypt";

const jwtSecretKey = env.JWT_SECRETKEY || '';

class JwtMiddleware {
    constructor(private readonly userService: IUserService) {}

    validateBodyRefresh(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        return res.status(400).json({ status: 400, message: 'Missing required field: refreshToken' })
    }

    validateJWT(req: Request, res: Response, next: NextFunction) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ')
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).json({ status: 401 });
                } else {
                    res.locals.jwt = jwt.verify(authorization[1], jwtSecretKey) as IJwt;
                    console.log(res.locals.jwt)
                    return next();
                }
            } catch (error) {
                return res.status(403).json( {status: 403} );
            }
        } else {
            return res.status(401).json({ status: 401, message: 'No token was found in request' });
        }
    }

    validateRefreshToken = async(req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.getUserCredentialsByEmail(res.locals.jwt.email);
        const salt = res.locals.jwt.refreshKey;
        const hash = hashSync( res.locals.jwt.userId + jwtSecretKey, salt);
        
        if (hash === req.body.refreshToken && user) {
            req.body = {
                userId: user._id,
                email: user.email,
                role: user.role,
            };
            console.log(req.body)
            return next();
        } else {
            return res.status(400).json({ status: 400, message: 'Invalid refresh token'});
        }
    }
}

export default JwtMiddleware;