import { Request, Response } from 'express';
import { generateJWT } from '../../common/helpers/generate-jwt';
import { IUsersService } from '../../interfaces/user.interface';

class AuthController {
    constructor(private readonly usersService: IUsersService) {}
    generateJWT(req: Request, res: Response) {
        try {
            const { token, hash } = generateJWT({
                userId: req.body.userId,
                username: req.body.username,
                email: req.body.email,
                role: req.body.email
            });

            return res.status(201).json({ username: req.body.username, accessToken: token, refreshToken: hash });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ status: 500, message: err.message });
            } else {
                return res.status(500).json({ status: 500, message: 'Unknow failure' });
            }
        }
    }

    signInGoogle = async(req: Request, res: Response) => {
        try {
            const userData = { 
                username: req.body.username || '',
                email: req.body.email,
                password: ':lol',
                image: req.body.picture,
                google: true,
            };

            let user = await this.usersService.getUserByEmail(userData.email);

            if (!user) {
                user = await this.usersService.create(userData);
            }
            
            const { token, hash } = generateJWT({
                userId: user._id || '',
                username: user.username,
                email: user.email,
                role: user.role || '',
            });

            return res.status(201).json({ username: user.username, accessToken: token, refreshToken: hash });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ status: 500, message: err.message });
            } else {
                return res.status(500).json({ status: 500, message: 'Unknow failure' });
            }
        }
    }
}

export default AuthController;