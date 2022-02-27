import { Link, useHistory } from 'react-router-dom';
import { FiEdit as EditIcon } from 'react-icons/fi';
import { FiTrash2 as RemoveIcon } from 'react-icons/fi';
import { FiPlus as PlusIcon } from 'react-icons/fi';
import noImage from '../../assets/no-image.jpg';
import { useEffect, useState } from 'react';
import API from '../../config/axios';
import { IProduct } from '../../interfaces/Products';

export const ProductsListPage = () => {
    const history = useHistory();

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        API.get('/products')
        .then(resp => {
            console.log(resp.data)
            setProducts(resp.data.products);
        })
        .catch(err => console.log(err));
    }, [])

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
                    products.map( (product, idx) => (
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
                                <img src={product.image ? product.image : noImage} alt={product.name} />
                            </figure>
                            <div className="item-card__content">
                                <h2 className="item-card__title">{product.name}</h2>
                                <p>USD ${product.price}</p>
                                <p>{product.stock} availables</p>
                            </div>
                        </div>
                    )) 
                }
                
            </div>
        </div>
    )
}
