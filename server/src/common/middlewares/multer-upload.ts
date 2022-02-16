import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./_temp_uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

// eslint-disable-next-line no-undef
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        cb(new Error('File type is not supported'));
        return;
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter,});

export default upload;