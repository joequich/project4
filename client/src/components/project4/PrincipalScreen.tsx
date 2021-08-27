import React from 'react';
import imagen from '../../assets/camera_logitech.jpg';

export const PrincipalScreen = () => {
    return (
            <div className="container">
                <div className="items-list">
                    <div className="item-card">
                        <figure className="item-card__picture">
                            <img src={imagen} alt="camera" />
                        </figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                    <div className="item-card">
                        <figure className="item-card__picture">Image</figure>
                        <h2 className="item-card__title">Title</h2>
                        <div className="item-card__body">Body</div>
                    </div>
                     
                    
                </div>
            </div>
    )
}
