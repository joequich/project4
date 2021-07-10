import bcrypt from 'bcrypt';

export const hashSync = (password: string, salt: string): string => {
    return bcrypt.hashSync(password, salt);
};

export const generateSalt = (rounds = 10, minor:'b' | 'a' = 'b'): string => {
    return bcrypt.genSaltSync(rounds, minor);
};

export const compareSync = (plaintTextPassword: string, hash: string): boolean => {
    return bcrypt.compareSync(plaintTextPassword, hash);
};

   
