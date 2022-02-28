import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const errorFormatter = ({ msg, value }: ValidationError) => {
    return { value, reason: msg };
};

export const validateFields = ( req: Request, res: Response, next: NextFunction ) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid fields', 
            errors: errors.array()
        });
    }
    next();
};