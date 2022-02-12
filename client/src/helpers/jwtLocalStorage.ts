const P4_STORE_KEY = "p4_token";

export const getToken = (): string => {
    return JSON.parse(window.localStorage.getItem(P4_STORE_KEY) || 'null');
};

export const saveToken = (token: string): void => {
    window.localStorage.setItem(P4_STORE_KEY, JSON.stringify(token));
};

export const destroyToken = (): void => {
    window.localStorage.removeItem(P4_STORE_KEY);
};
