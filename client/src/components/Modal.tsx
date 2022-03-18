import { Link } from 'react-router-dom';

interface IModal {
    setIsOpen: (value: boolean) => void;
    // addButton: boolean;
    // to: string;
}


export const Modal = ({ setIsOpen }: IModal) => {
    return (
        <div className="modal-background" onClick={() => setIsOpen(false)}>
            <div className="modal-wrapper">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">Titulo de Modal</div>
                        <div className="modal-close">
                            <button onClick={() => setIsOpen(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        COntenido del cuerpo del modal
                    </div>
                    <div className="modal-actions">
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                        <button>Continue</button>
                    </div>
                </div>
            </div>    
        </div>
    )
}