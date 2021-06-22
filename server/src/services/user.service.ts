import { CallbackError, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

export default class UserService {
    async create (data = {}) {
        try {
            const user = new User(data);
            await user.save();
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while Save User');
        }
    }

    async read (query = {}, from: number, limit: number) {
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

    async update (id: string, data = {}) {
        try {
            const user = await User.findByIdAndUpdate(id, data, { new: true });
            return user;
        } catch {
            // Log Errors
            throw new Error('Error while updating user');
        }
    }

    async delete (id: string) {
        try {
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
            return user;
        } catch {
            throw new Error('Error while deleting user');
        }
    }
}