const ID_USER_KEY = "p4_user";

export interface PayloadJwt{
    userId: string;
    username: string;
    email: string;
    role: string;
}

export const getUser = (): PayloadJwt => {
    return JSON.parse(window.localStorage.getItem(ID_USER_KEY) || 'null');
};

export const saveUser = (user: PayloadJwt): void => {
    window.localStorage.setItem(ID_USER_KEY, JSON.stringify(user));
};

export const destroyUser = (): void => {
    window.localStorage.removeItem(ID_USER_KEY);
};
