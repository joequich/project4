import { useState } from 'react';
import { Close } from './icons/Close';

export const AlertMessage = ({ errorMessage }: { errorMessage: string }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="alert alert-danger mb-sm">
            <div className="alert__close-icon" onClick={handleClose}>
                <Close />
            </div>
            <span>{errorMessage}</span>
        </div>
    );
};
