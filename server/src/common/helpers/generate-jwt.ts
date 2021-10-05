import jwt from 'jsonwebtoken';
import env from '../config/env.config';
import { generateSalt, hashSync } from './bcrypt';
import { PayloadJwt } from '../../interfaces/jwt.interface';

const jwtSecret = env.JWT_SECRETKEY || '';
const tokenDuration = '4h';

export const generateJWT = (body: PayloadJwt): {token: string, hash: string} => {
    const refreshId = body.userId + jwtSecret;
    const salt = generateSalt();
    const payload = {
        ...body, refreshKey: salt
    }
    const hash = hashSync(refreshId, salt);
    const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenDuration });
    return {
        token,
        hash
    }
}