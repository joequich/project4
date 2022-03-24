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
                        <div className="modal-title">Eliminar producto</div>
                    </header>
                    <button className="modal__close-btn btn" autoFocus onClick={() => setIsOpen(false)}>
                        <CloseIcon className='icon'/>
                    </button>
                    <div className="modal__body">
                        Desea eliminar este producto?
                    </div>
                    <footer className="modal__footer">
                        <button className="btn btn--primary btn--primary-outline btn__close" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button className="btn btn--primary">Continue</button>
                    </footer>
                </section>
            </div>
        </>,
        modalElement
    )
}