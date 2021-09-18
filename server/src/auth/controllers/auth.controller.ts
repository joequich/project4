import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateSalt, hashSync } from '../../common/helpers/bcrypt';
import env from '../../common/config/env.config';

const jwtSecret = env.JWT_SECRETKEY || '';
const tokenDuration = '4h';

class AuthController {
    async generateJWT(req: Request, res: Response) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const salt = generateSalt();
            const hash = hashSync(refreshId, salt);
            req.body.refreshKey = salt;
            const token = jwt.sign(req.body, jwtSecret, { expiresIn: tokenDuration });
            console.log(req.body)
            return res.status(201).json({ accessToken: token, refreshToken: hash });
        } catch (error) {
            if (error instanceof Error) {
                console.log('createJWT error: %O', error)
                return res.status(500).json({ status: 500, message: error.message });
            } else {
                console.log(error);
                return res.status(500).json({ status: 500, message: 'Unknow failure' });
            }
        }
    }
}

export default AuthController;