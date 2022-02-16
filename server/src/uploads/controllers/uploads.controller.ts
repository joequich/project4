import { Request, Response } from 'express';
import { IUploadsService } from '../../interfaces/uploads.interface';

export default class UploadsController {
    constructor(private readonly uploadsService: IUploadsService) {}

    uploadSingleFile = async (req: Request, res: Response) => {
        try {
            if (!req.file?.path) return res.status(409).json({ message: 'Error while uploading a file'});

            const response = await this.uploadsService.uploadImage(req.file.path);
            return res.status(201).json({ url: response, message: 'Succesfully File uploaded', });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(409).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

    uploadMultipleFile = async (req: Request, res: Response) => {
        const page = req.query.page ? Number(req.query.page) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 10;

        try {
            // const products = await this.productsService.list(page, limit);

            return res.status(200).json({ message: 'Succesfully Products List', });
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Unknow failure' });
            }
        }
    };

   
}
