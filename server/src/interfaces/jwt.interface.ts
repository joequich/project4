export interface IJwt {
    userId: string;
    role: string;
}

export interface PayloadJwt{
    userId: string;
    username: string;
    email: string;
    role: string;
}