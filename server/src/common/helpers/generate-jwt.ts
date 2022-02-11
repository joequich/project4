import jwt from 'jsonwebtoken';
import env from '../config/env.config';
import { PayloadJwt } from '../../interfaces/jwt.interface';

const jwtAccessSecret = env.JWT.ACCESS_SECRET_KEY || '';
const accessTokenDuration = env.JWT.ACCESS_EXPIRATION_TIME || '0';
const jwtRefreshSecret = env.JWT.REFRESH_SECRET_KEY || '';
const refreshTokenDuration = env.JWT.REFRESH_EXPIRATION_TIME || '0';

export const generateJwtKeys = (payload: PayloadJwt): {accessToken: string, cookieRefreshToken: string} => {
    const accessToken = jwt.sign(payload, jwtAccessSecret, {
        expiresIn: `${accessTokenDuration}s`
    });

    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
        expiresIn: `${refreshTokenDuration}s`
    })

    const cookieRefreshToken = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshTokenDuration}; SameSite=SameSite`;

    return {
        accessToken,
        cookieRefreshToken
    }
}

export const getCookiesForLogOut = () => {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax',
      'Refresh=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
    ];
}