import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../config/axios';
import { IErrorFormAddProduct, IFormAddProduct } from '../../interfaces/Forms';
import { validateProductFields } from '../../helpers/validate-fields';
import { useForm } from '../../hooks/useForm';
import { IProduct } from '../../interfaces/Products';
type Params = {
    id: string;
  };
export const ProductsEditPage = () => {
    const history = useHistory();
    const { id } = useParams<Params>();

    const handleEditProduct = async() => {
        const data = new FormData();
        formValues['name'] && data.append('name', formValues['name'])
        formValues['description'] && data.append('description', formValues['description'])
        formValues['stock'] && data.append('stock', formValues['stock'])
        formValues['price'] && data.append('price', formValues['price'])
        image && data.append('image', image)
        await API.patch(`/products/${id}`, data)
            .then(resp => {
                console.log(resp)
                history.push('/products')
                toast.success('Product updated successfully!!');
            })
            .catch(err => {
                console.log(err)
                toast.error('An error occurred!!');
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

    // const [product, setProduct] = useState<IProduct>({
    //     ...initialProduct,
    //     user: '',
    // })

    const fetchProduct = async() => {
        const response = await API.get(`/products/${id}`);
        // setProduct(response.data);
        setCloudImage(response.data.image)
        resetValues({
            name: response.data.name || '',
            description: response.data.description || '',
            stock: response.data.stock || '0',
            price: response.data.price || '0',
        })
        // console.log(product)
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
        fetchProduct();
    }, [])

    return (
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
    );
};