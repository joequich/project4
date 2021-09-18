import { IRole, IRoleService } from '../../interfaces/role.interface';
import Role from '../models/roles.model';

export default class RoleService implements IRoleService {
    async create(data: IRole): Promise<IRole> {
        try {
            const role = new Role(data);
            await role.save();
            return role;
        } catch {
            // Log Errors
            throw new Error('Error while Save Role');
        }
    }

    async getRole(role: string): Promise<(IRole) | null>  {
        try {
            const roleExist = await Role.findOne({role});
            return roleExist;
        } catch {
            throw new Error(`The role ${role} is not registered in the DB`);
        }
    }
}