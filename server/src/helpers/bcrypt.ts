import bcrypt from 'bcrypt';

export const setPassword = (password: string): { hash: string; salt: string; } => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return { hash, salt };
};
   
export const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

   
