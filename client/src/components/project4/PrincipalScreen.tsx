import React from 'react';
import imagen from '../../assets/keyboard_keychron.jpg';
import { StarRating } from '../ui/StarRating';

export const PrincipalScreen = () => {
    let arr = [...Array(20)];
    return (
        <div className="products-container">
            <div className="items-list mt-md">
                {
                    arr.map((val, idx) => (
                        <div key={idx} className="item-card">
                            <figure className="item-card__figure">
                                <img src={imagen} alt="camera" />
                            </figure>
                            <div className="item-card__content">
                                <h2 className="item-card__title">Title</h2>
                                <div className="item-card__star-rating">
                                    <StarRating />
                                </div>
                                <div className="item-card__price">Price</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
