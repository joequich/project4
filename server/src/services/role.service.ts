import { IRole } from '../interfaces/role.interface';
import Role from '../models/role.model';

export default class RoleService {
    async create(data: IRole) {
        try {
            const role = new Role(data);
            await role.save();
            return role;
        } catch {
            // Log Errors
            throw new Error('Error while Save Role');
        }
    }

    async getRole(role: string) {
        try {
            const roleExist = await Role.findOne({role});
            return roleExist;
        } catch {
            throw new Error(`The role ${role} is not registered in the DB`);
        }
    }
}