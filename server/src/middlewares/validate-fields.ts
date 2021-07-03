import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
 
const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
  };

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}