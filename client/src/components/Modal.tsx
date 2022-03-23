import ReactDOM from 'react-dom'
import { FiX as CloseIcon } from 'react-icons/fi'
interface IModal {
    setIsOpen: (value: boolean) => void;
    // addButton: boolean;
    // to: string;
}


export const Modal = ({ setIsOpen }: IModal) => {
    const modalElement = document.getElementById('modal') as HTMLElement;
    return ReactDOM.createPortal(
        <>
            {/* <div className="modal__background" onClick={() => setIsOpen(false)}>
            </div> */}
            <div className="modal__wrapper" onClick={() => setIsOpen(false)}>
                <section className="modal__content">
                    <header className="modal__header">
                        <div className="modal-title">Titulo de Modal</div>
                    </header>
                    <button className="modal__close-btn" onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </button>
                    <div className="modal__body">
                        COntenido del cuerpo del modal
                    </div>
                    <footer className="modal__footer">
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                        <button>Continue</button>
                    </footer>
                </section>
            </div>
        </>,
        modalElement
    )
}