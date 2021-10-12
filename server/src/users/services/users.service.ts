import { IPatchUser, IPutUser, IUser, IUsersService } from '../../interfaces/user.interface';
import User from '../models/users.model';

export default class UsersService implements IUsersService {
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
            const user = await User.findById(id, {status: true});
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Reading User');
        }
    }

    async getUserByEmail(email: string): Promise<(IUser) | null> {
        try {
            const user = await User.findOne({email});
            return user;
        } catch {
            throw new Error('Error while Reading User email');
        }
    }

    async getUserCredentialsByEmail(email: string): Promise<IUser | null>{
        try {
            const user = await User.findOne({email}).select(['_id','email','password','role','google','username']).exec();
            return user;
        } catch {
            throw new Error('Error while Reading User email');
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

    async deleteById(id: string): Promise<{ id: string; deleted: boolean } | null> {
        try {
            await User.findByIdAndDelete(id);
            return { id, deleted: true };
        } catch {
            throw new Error('Error while deleting user');
        }
    }
}