import { Link } from 'react-router-dom';

export const NoItems = ({ addButton = false, to = '' }) => {
    return (
        <div className="no-items">
            <p>No hay nada por aqui</p>
            {
                addButton
                ? 
                <div>
                    <Link to='/products/add'>
                        Agregar Algo
                    </Link>
                </div>
                : null
            }
            
        </div>
    )
}