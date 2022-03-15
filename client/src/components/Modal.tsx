import { Link } from 'react-router-dom';

export const Modal = ({ addButton = false, to = '' }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal__header-title"></div>
                    <div className="modal__header-close"></div>
                </div>
                <div className="modal-body">
                </div>
                <div className="modal-actions">
                </div>
            </div>    
        </div>
    )
}