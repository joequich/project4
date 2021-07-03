import { IPatchUser, IPutUser, IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

export default class UserService {
    async create(data: IUser) {
        try {
            console.log('service',data);
            const user = new User(data);
            await user.save();
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Save User');
        }
    }

    async list(query = {}, from: number, limit: number) {
        try {
            const [ total, users ] = await Promise.all([
                User.countDocuments(query),
                User.find(query)
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

    async readById(id: string) {
        try {
            const user = User.findById(id, {status: true});
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Reading User');
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = User.findOne({email});
            return user;
        } catch {
            throw new Error('Error while Reading User email')
        }
    }

    async updateById (id: string, data: IPutUser | IPatchUser) {
        try {
            const user = await User.findByIdAndUpdate(id, {$set: data}, {new: true}).setOptions({upsert: true});
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while updating user');
        }
    }

    async deleteById (id: string) {
        try {
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
            return user;
        } catch {
            throw new Error('Error while deleting user');
        }
    }
}