import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
 
const errorFormatter = ({ msg}: ValidationError) => {
    return `${msg}`;
  };

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: 'Invalid fields', errors: errors.array() });
    }
    next();
}