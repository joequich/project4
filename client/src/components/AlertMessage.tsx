import { useEffect, useState } from 'react';
import { Close } from './icons/Close';
import { SerializedError } from '@reduxjs/toolkit';

interface IErrors {
    value: string;
    reason: string;
}
interface ErrorPayload {
    status: number;
    message: string;
    errors?: IErrors[];
}

export const AlertMessage = ({ error }: { error: ErrorPayload | SerializedError; }) => {
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState<IErrors[]>();
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if('message' in error) {
            setMessage(error.message!);
        } else {
            setMessage('xD');
        }
        
        if ('errors' in error) {
            setErrors(error.errors!);
        } else {
            setErrors(undefined);
        }
    }, [errors, message, error]);

    if (!show) {
        return null;
    }

    return (
        <div className="alert alert-danger mb-sm">
            <div className="alert__close-icon" onClick={handleClose}>
                <Close />
            </div>
            <span>{message}</span>
            <ul>
                {errors &&
                    errors.map((error, idx) => (
                        <li key={idx}>{`${error.reason}: ${error.value}`}</li>
                    ))}
            </ul>
        </div>
    );
};
