export interface IJwt {
    refreshKey: string;
    userId: string;
    role: string;
}

export interface PayloadJwt{
    userId: string;
    username: string;
    email: string;
    role: string;
    refreshKey?: string;
}