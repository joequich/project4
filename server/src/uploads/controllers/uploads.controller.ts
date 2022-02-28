import { Request, Response } from 'express';
import { IUploadsService } from '../../interfaces/uploads.interface';

export default class UploadsController {
    constructor(private readonly uploadsService: IUploadsService) {}

    uploadSingleFile = async (req: Request, res: Response) => {
        try {
            if (!req.file?.path) return res.status(409).json({ message: 'Error while uploading a file'});

            const response = await this.uploadsService.uploadImage(req.file.path);
            return res.status(201).json({ url: response, });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(409).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };
}
