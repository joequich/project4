import cloudinary from 'cloudinary';
import fs from 'fs';
import env from '../config/env.config';

cloudinary.v2.config({
    cloud_name: env.CLOUDINARY.CLOUD_NAME,
    api_key: env.CLOUDINARY.API_KEY,
    api_secret: env.CLOUDINARY.API_SECRET,
    secure: true,
});

export default class UploadsService {
    async uploadImage(fileLocalPath: string): Promise<string> {
        try {
            const { secure_url } = await cloudinary.v2.uploader.upload(fileLocalPath, {
                folder: 'Project4-P',
            });
    
            fs.unlinkSync(fileLocalPath);
            
            return secure_url;
        } catch {
            fs.unlinkSync(fileLocalPath);
            throw new Error('Error while upload a Image');
        }
    }

    async destroyImage(fileCloudPath: string): Promise<void> {
        try {
            const nameArr = fileCloudPath.split('/');
            const name = nameArr[nameArr.length - 1];
            const [ public_id ] = name.split('.');
            await cloudinary.v2.uploader.destroy(public_id,function(error,result) {
                console.log(result, error) });
        } catch {
            throw new Error('Error while destroy a Image');
        }
    }
}