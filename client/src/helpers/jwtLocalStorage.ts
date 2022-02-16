const P4_STORE_KEY = "p4_token";

interface IUserToken {
    username: string;
    accessToken: string;
}

export const getUserToken = (): IUserToken | null => {
    return JSON.parse(window.localStorage.getItem(P4_STORE_KEY) || 'null');
};

export const saveUserToken = (loginRes: IUserToken): void => {
    window.localStorage.setItem(P4_STORE_KEY, JSON.stringify(loginRes));
};

export const destroyUserToken = (): void => {
    window.localStorage.removeItem(P4_STORE_KEY);
};
