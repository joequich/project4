import { Link, useHistory } from 'react-router-dom';
import { FiEdit as EditIcon } from 'react-icons/fi';
import { FiTrash2 as RemoveIcon } from 'react-icons/fi';
import { FiPlus as PlusIcon } from 'react-icons/fi';
import imagen from '../../assets/keyboard_keychron.jpg';

export const ProductsListPage = () => {
    const history = useHistory();

    let arr = [...Array(10)];

    const handleNew = () => {
        history.replace('/products/add');
    }

    return (
        <div className="products-container">
            <div className="products-header mt-md">
                <span className="products-header__title">All Products</span>
                <hr />
                <button onClick={handleNew} className="products-header__add-btn">
                    <PlusIcon />
                    New product
                </button>
            </div>
            <div className="items-list">
                {
                    arr.map( (val, idx) => (
                        <div key={idx} className="item-card">
                            <div className="item-card__options">
                                <Link className="opt" to="">
                                    <EditIcon />
                                </Link>
                                <Link className="opt" to="">
                                    <RemoveIcon />
                                </Link>
                            </div>
                            <figure className="item-card__figure">
                                <img src={imagen} alt="camera" />
                            </figure>
                            <div className="item-card__content">
                                <h2 className="item-card__title">Keyboard Wireless</h2>
                                <p>USD $60</p>
                                <p>160 availables</p>
                            </div>
                        </div>
                    )) 
                }
                
            </div>
        </div>
    )
}
