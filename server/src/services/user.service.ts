import { IPatchUser, IPutUser, IUser, IUserService } from '../interfaces/user.interface';
import User from '../models/user.model';

export default class UserService implements IUserService {
    async create(data: IUser): Promise<IUser> {
        try {
            const user = new User(data);
            await user.save();
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Save User');
        }
    }

    async list(from: number, limit: number): Promise<{users: IUser[]; total: number;}> {
        try {
            const [ total, users ] = await Promise.all([
                User.countDocuments({ status: true }),
                User.find({ status: true })
                    .skip(Number(from))
                    .limit(Number(limit))
            ]);
            return {
                users, total
            }
        } catch {
            // Log Errors
            throw new Error('Error while Paginating Users');
        }
    }

    async readById(id: string): Promise<(IUser) | null> {
        try {
            const user = User.findById(id, {status: true});
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Reading User');
        }
    }

    async getUserByEmail(email: string): Promise<(IUser) | null> {
        try {
            const user = User.findOne({email});
            return user;
        } catch {
            throw new Error('Error while Reading User email')
        }
    }

    async updateById(id: string, data: IPutUser | IPatchUser): Promise<(IUser) | null> {
        try {
            const user = await User.findByIdAndUpdate(id, {$set: data}, {new: true}).setOptions({upsert: true});
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while updating user');
        }
    }

    async deleteById(id: string): Promise<(IUser) | null> {
        try {
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
            return user;
        } catch {
            throw new Error('Error while deleting user');
        }
    }
}