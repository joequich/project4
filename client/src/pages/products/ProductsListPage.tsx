import { Link, useHistory } from 'react-router-dom';
import { FiEdit as EditIcon } from 'react-icons/fi';
import { FiTrash2 as RemoveIcon } from 'react-icons/fi';
import { FiPlus as PlusIcon } from 'react-icons/fi';
import noImage from '../../assets/no-image.jpg';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IProduct } from '../../interfaces/Products';
import { Modal } from '../../components/Modal';
import { FullPageLoader } from '../../components/FullPageLoader';
import ProductService from '../../services/products';

export const ProductsListPage = () => {
    const history = useHistory();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const productId = useRef('');

    const showConfirmationModal = (id: string) => {
        productId.current = id;
        setIsOpen(true);
    }

    const loadProducts = () => {
        setIsLoading(true);
        ProductService.getAll()
        .then(res => {
            setProducts(res.products);
        })
        .catch(error => {
            console.log(error);
            toast.error('An error occurred!!');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const handleDeleteProduct = async() => {
        setIsLoading(true);
        return ProductService
        .deleteById(productId.current)
        .then(res => {
            toast.success('Product deleted successfully!!');
        })
        .catch(err => {
            console.log(err)
            toast.error('An error occurred!!');
        })
        .finally(() => {
            setIsLoading(false);
            loadProducts();
        });
    };

    useEffect(() => {
        loadProducts();
    }, [])

    useEffect(() => {
        const body = document.querySelector('body');
        if(body)
            body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen])

    const handleNew = () => {
        history.replace('/products/add');
    }

    return (
        <>
        {isLoading && <FullPageLoader />}
        <div className="products-container">
            <div className="products-header">
                <span className="products-header__title">All Products</span>
                <div className="products-header__actions">
                    <button onClick={handleNew} className="btn btn--primary ">
                        <PlusIcon  className="icon icon__btn" />
                        <span className="text-sm">New product</span>
                    </button>
                </div>
            </div>
            <div className="items-list">
                {
                    products.map( (product, idx) => (
                        <div key={idx} className="item-card">
                            <div className="item-card__options">
                                <Link className="opt btn" to={`/products/${product._id}/edit`}>
                                    <EditIcon className="icon"/>
                                </Link>
                                <button className="opt btn" onClick={() => showConfirmationModal(product._id)}>
                                    <RemoveIcon className="icon" />
                                </button>
                                {isOpen 
                                    ? <Modal 
                                        setIsOpen={setIsOpen} 
                                        title="Delete Product"
                                        message="Are you sure?"
                                        cbFuntion={handleDeleteProduct} 
                                      />
                                    : null
                                }
                            </div>
                            <figure className="item-card__figure">
                                <img src={product.image ? product.image : noImage} alt={product.name} />
                            </figure>
                            <div className="item-card__content">
                                <div className="item-card__title"><span>{product.name}</span></div>
                                <div className="item-card__price"><span>$.{product.price}</span></div>
                                <div className="item-card__stock"><span>{product.stock} availables</span></div>
                            </div>
                        </div>
                    )) 
                }
                
            </div>
        </div>
        </>
    )
}
