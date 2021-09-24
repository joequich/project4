import { useEffect, useState } from 'react';
import { Close } from './icons/Close';
import { SerializedError } from '@reduxjs/toolkit';

interface IErrors {
    value: string;
    reason: string;
}
interface ErrorPayload {
    status: number;
    error: {
        message: string;
        errors?: IErrors[];
    };
}

export const AlertMessage = ({ error }: { error: ErrorPayload | SerializedError; }) => {
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState<IErrors[]>();
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if ('error' in error) {
            setMessage(error.error.message);
            if ('errors' in error.error) setErrors(error.error.errors!);
        } else {
            setMessage(error.message!);
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
