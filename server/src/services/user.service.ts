import User from '../models/users.model';

export default class UserService {
    async save(data = {}) {
        try {
            const user = new User(data);
            await user.save();
            return user;
        } catch (e) {
            // Log Errors
            throw new Error('Error while Save User')
        }
    }

    async get(query = {}, from: number, limit: number) {
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
        } catch (e) {
            // Log Errors
            throw new Error('Error while Paginating Users')
        }
    }
}