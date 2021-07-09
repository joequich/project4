
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { setPassword } from '../helpers/bcrypt';
import { env } from '../config/index';

const jwtSecret = env.JWT_SECRETKEY || '';
const tokenDuration = '4h';

class AuthController {
    async generateJWT(req: Request, res: Response) {
        try {
            const refreshId = req.body.id + jwtSecret;
            const { hash, salt } = setPassword(refreshId);
            req.body.refreshKey = salt;
            const token = jwt.sign(req.body, jwtSecret, { expiresIn: tokenDuration });
           
            return res .status(201).json({ accessToken: token, refreshToken: hash });
        } catch (error) {
            console.log('createJWT error: %O', error);
            return res.status(500).json({ status: 500, message: error.message });
        }
    }
}

export default AuthController;