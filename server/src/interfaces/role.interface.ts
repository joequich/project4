export interface IRole {
    role: string;
}

export interface IRoleService {
    create: (data: IRole) => Promise<IRole>;
    getRole: (name: string) => Promise<(IRole) | null>;
}