import cloudinary from 'cloudinary';
import env from '../config/env.config';

cloudinary.v2.config({
    cloud_name: env.CLOUDINARY.CLOUD_NAME,
    api_key: env.CLOUDINARY.API_KEY,
    api_secret: env.CLOUDINARY.API_SECRET,
    secure: true,
});

export const uploadImage = async (filePath: string): Promise<string> => {
    try {
        const { secure_url } = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'Project4-P',
        });
        return secure_url;
    } catch {
        throw new Error('Error while upload a Image');
    }
};

export const destroyImage = async (filePath: string): Promise<void> => {
    try {
        const nameArr = filePath.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        await cloudinary.v2.uploader.destroy(public_id,function(error,result) {
            console.log(result, error) });
    } catch {
        throw new Error('Error while destroy a Image');
    }
};
