import { StarRating } from '../../components/StarRating';
import noImage from '../../assets/no-image.jpg';
import { NoItems } from '../../components/NoItems';
import { useEffect, useState } from 'react';
import API from '../../config/axios';
import { IProduct } from '../../interfaces/Products';

export const HomePage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        API.get('/products')
        .then(resp => {
            console.log(resp.data)
            setProducts(resp.data.products);
        })
        .catch(err => console.log(err));
    }, [])
    
    return (
        <div className="products-container">
            <div className="items-list mt-md">
                {
                    products.length !== 0
                    ?
                    products.map((product, idx) => (
                        <div key={idx} className="item-card">
                            <figure className="item-card__figure">
                                <img src={product.image ? product.image : noImage} alt={product.name} />
                            </figure>
                            <div className="item-card__content">
                                <h2 className="item-card__title">{product.name}</h2>
                                <div className="item-card__star-rating">
                                    <StarRating />
                                </div>
                                <div className="item-card__price">{product.price}</div>
                            </div>
                        </div>
                    ))
                    :
                    <NoItems addButton={true}/>
                }
            </div>
        </div>
    )
}
