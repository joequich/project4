import bcrypt from 'bcrypt';

export const setPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};
   
export const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

   
