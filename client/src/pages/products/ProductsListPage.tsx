import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import imagen from '../../assets/keyboard_keychron.jpg';
import { EditIcon } from '../../components/icons/EditIcon';
import { RemoveIcon } from '../../components/icons/RemoveIcon';
import { PlusIcon } from '../../components/icons/PlusIcon';

export const ProductsListPage = () => {
    const history = useHistory();

    let arr = [...Array(10)];

    const handleNew = () => {
        history.replace('/products/add');
    }

    return (
        <div className="products-container">
            <div className="products-header">
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
