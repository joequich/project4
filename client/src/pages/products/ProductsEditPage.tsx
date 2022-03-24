import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IErrorFormAddProduct, IFormAddProduct } from '../../interfaces/Forms';
import { validateProductFields } from '../../helpers/validate-fields';
import { useForm } from '../../hooks/useForm';
import { FullPageLoader } from '../../components/FullPageLoader';
import ProductService from '../../services/products';
type Params = {
    id: string;
  };
export const ProductsEditPage = () => {
    const history = useHistory();
    const { id } = useParams<Params>();
    const [isLoading, setIsLoading] = useState(false);

    const handleEditProduct = async() => {
        const data = formValues as IFormAddProduct;
        setIsLoading(true);
        return ProductService
            .updateById(id,{ ...data, image })
            .then(res => {
                history.push('/products');
                toast.success('Product updated successfully!!');
            })
            .catch(error => {
                console.log(error);
                toast.error('An error occurred!!');
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return;
        setImage(files[0]);
    }

    const initialProduct = {
        name: '',
        description: '',
        stock: '0',
        price: '0',
    }

    const { values: formValues, handleChange, handleSubmit, errors, resetValues } = useForm(
        initialProduct,
        handleEditProduct,
        validateProductFields
    );

    const [image, setImage] = useState<File>();
    const [cloudImage, setCloudImage] = useState('');

    const { name, description, stock, price } = formValues as IFormAddProduct;
    const errorsForm = errors as IErrorFormAddProduct;

    useEffect(() => {
        setIsLoading(true);
        ProductService.getById(id)
        .then(res => {
            setCloudImage(res.image);
            resetValues({
                name: res.name || '',
                description: res.description || '',
                stock: res.stock || '0',
                price: res.price || '0',
            })
        })
        .catch(error => {
            console.log(error);
            toast.error('An error occurred!!');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [id]);

    return (
        <>
            {isLoading && <FullPageLoader />}
            <div className="products-container">
                <div className="products-header">
                    <span className="products-header__title">Edit Product</span>
                </div>
                <form onSubmit={handleSubmit} className="forms-group text-base">
                    <div className="row">
                        <div className="col-all row">
                            {
                                cloudImage
                                ?
                                (
                                    <div className="picture-area mb-sm">
                                        <figure>
                                            <img className="picture-img" src={cloudImage} alt={name} />
                                            <figcaption className="text-sm text-center mt-sm mb-sm">Current picture</figcaption>
                                        </figure>
                                    </div>
                                )
                                :
                                null
                            }
                        </div>
                        <div className="col-resp">
                            <div className="input-wrapper mb-sm">
                                <label htmlFor="email">Product: </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    placeholder="Name of your product"
                                    aria-placeholder="Name of your product"
                                    autoComplete="off"
                                    value={name}
                                    onChange={handleChange}
                                    autoFocus
                                />
                                {errorsForm.fields.name ? (
                                    <p className="msg-error ">
                                        {errorsForm.fields.name}
                                    </p>
                                ) : null}
                            </div>
                            <div className="input-wrapper mb-sm">
                                <label htmlFor="password">Description: </label>
                                <textarea
                                    name="description"
                                    className="input-field"
                                    placeholder="Some text description..."
                                    aria-placeholder="Description of your product"
                                    autoComplete="off"
                                    value={description}
                                    onChange={handleChange}
                                />
                                {errorsForm.fields.description ? (
                                    <p className="msg-error ">
                                        {errorsForm.fields.description}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-resp">
                            <div className="input-wrapper mb-sm">
                                <label htmlFor="image">Choose a product picture:</label>
                                <input 
                                    type="file" 
                                    id="image" 
                                    name="image" 
                                    accept="image/png, image/jpeg"
                                    onChange={handleImage}
                                    className="browse"
                                />
                            </div>
                            <div className="row">

                                <div className="col-half">
                                    <div className="input-wrapper mb-sm">
                                        <label htmlFor="stock">Stock: </label>
                                        <input
                                            type="text"
                                            name="stock"
                                            className="input-field"
                                            placeholder="Stock"
                                            aria-placeholder="Product Stock"
                                            autoComplete="off"
                                            value={stock}
                                            onChange={handleChange}
                                            style={{ width: '80px' }}
                                        />
                                        {errorsForm.fields.stock ? (
                                            <p className="msg-error ">
                                                {errorsForm.fields.stock}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="input-wrapper mb-sm">
                                        <label htmlFor="password">Price: </label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="input-field"
                                            placeholder="Price"
                                            aria-placeholder="Product Price"
                                            autoComplete="off"
                                            value={price}
                                            onChange={handleChange}
                                            style={{ width: '80px' }}
                                        />
                                        {errorsForm.fields.price ? (
                                            <p className="msg-error ">
                                                {errorsForm.fields.price}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-btn mt-sm mb-md">
                        <button type="button" onClick={() => history.push('/products')} className="btn btn--primary-outline btn--medium mt-sm">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn--primary btn--medium ml-sm mt-sm">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};