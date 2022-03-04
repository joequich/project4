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

    const handleAddProduct = async() => {
        console.log(formValues)
            const data = new FormData();
            formValues['name'] && data.append('name', formValues['name'])
            formValues['description'] && data.append('description', formValues['description'])
            formValues['stock'] && data.append('stock', formValues['stock'])
            formValues['price'] && data.append('price', formValues['price'])
            image && data.append('image', image)
            await API.post('/products', data)
                .then(resp => {
                    console.log(resp)
                    history.push('/products')
                    toast.success('Product registered successfully!!');
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

    const [product, setProduct] = useState<IProduct>({
        ...initialProduct,
        user: '',
    })

    const fetchProduct = async() => {
        const response = await API.get(`/products/${id}`);
        console.log('fetch product', response);
        setProduct(response.data);
        setCloudImage(response.data.image)
        console.log(product)
        resetValues({
            name: response.data.name,
            description: response.data.description,
            stock: response.data.stock,
            price: response.data.price,
        })
    }

    const { values: formValues, handleChange, handleSubmit, errors, resetValues } = useForm(
        initialProduct,
        handleAddProduct,
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
            <div className="products-header mt-md m">
                <span className="products-header__title">Edit Product</span>
                <hr />
            </div>
            <form onSubmit={handleSubmit} className="forms-group mt-md">
            
                <div className="row-grid">
                    <div className="col">
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="email">Product: </label>
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Product name"
                                aria-placeholder="Your product name"
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
                                placeholder="Description..."
                                aria-placeholder="Your description"
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
                    <div className="col-50">
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
                            />
                            {errorsForm.fields.stock ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.stock}
                                </p>
                            ) : null}
                        </div>
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
                            />
                            {errorsForm.fields.price ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.price}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-50">
                        {
                            cloudImage
                            ?
                            (
                                <div className="input-wrapper mb-sm">
                                    <figure>
                                        <img width="200" src={cloudImage} alt={name} />
                                        <figcaption>Current picture</figcaption>
                                    </figure>
                                </div>
                            )
                            :
                            null
                        }
                    </div>
                    <div className="col-50">
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="image">Change product picture:</label>
                            <input 
                                type="file" 
                                id="image" 
                                name="image" 
                                accept="image/png, image/jpeg"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                </div>
                <div className="products-btn mt-sm mb-md">
                    <button type="button" onClick={() => history.push('/products')} className="btn btn-cancel mt-sm">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-save ml-sm mt-sm">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};