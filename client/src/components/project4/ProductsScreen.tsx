import React from 'react'
import { Link } from 'react-router-dom';
import imagen from '../../assets/keyboard_keychron.jpg';
import { Edit } from '../ui/icons/Edit';
import { Remove } from '../ui/icons/Remove';
import { Plus } from '../ui/icons/Plus';

export const ProductsScreen = () => {

    let arr = [...Array(10)];

    return (
        <div className="products-container">
            <div className="products-header">
                <span className="products-header__title">All Products</span>
                <hr />
                <button className="products-header__add-btn">
                    <Plus />
                    <span> Add new product</span>
                </button>
            </div>
            <div className="items-list">
                {
                    arr.map( (val, idx) => (
                        <div key={idx} className="item-card">
                            <div className="item-card__options">
                                <Link className="opt" to="">
                                    <Edit />
                                </Link>
                                <Link className="opt" to="">
                                    <Remove />
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
