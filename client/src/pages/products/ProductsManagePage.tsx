import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { validateProductFields } from '../../helpers/validate-fields';
import { useForm } from '../../hooks/useForm';
import { IErrorFormAddProduct, IFormAddProduct } from '../../interfaces/Forms';
// import toast from 'react-hot-toast';

export const ProductsManagePage = () => {
    const handleAddProduct = async() => {
        console.log(formValues)
        // try {
        //     const data = new FormData();
        //     formValues['product'] && data.append('name', formValues['product'])
        //     formValues['description'] && data.append('description', formValues['description'])
        //     formValues['stock'] && data.append('stock', formValues['stock'])
        //     formValues['price'] && data.append('price', formValues['price'])
        //     image && data.append('image', image)
        //     // const response = await client.post('/products');
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(!files) return;

        setImage(files[0]);
    }

    const { values: formValues, handleChange, handleSubmit, errors } = useForm(
        {
            product: '',
            description: '',
            stock: '0',
            price: '0',
        },
        handleAddProduct,
        validateProductFields
    );

    const [image, setImage] = useState<File>();

    const { product, description, stock, price, } = formValues as IFormAddProduct;
    const errorsForm = errors as IErrorFormAddProduct;

    return (
        <div className="products-container">
            <div className="products-header mt-md m">
                <span className="products-header__title">Add Products</span>
                <hr />
            </div>
            <form onSubmit={handleSubmit} className="forms-group mt-md">
            
                <div className="row-grid">
                    <div className="col">
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="email">Product: </label>
                            <input
                                type="text"
                                name="product"
                                className="input-field"
                                placeholder="Product name"
                                aria-placeholder="Your product name"
                                autoComplete="off"
                                value={product}
                                onChange={handleChange}
                                autoFocus
                            />
                            {errorsForm.fields.product ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.product}
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
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="image">Choose a product picture:</label>
                            <input 
                                type="file" 
                                id="image" 
                                name="image" 
                                accept="image/png, image/jpeg"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    <div className="col-50">
                    </div>
                </div>
                <div className="products-btn mt-sm mb-md">
                    <button type="submit" className="btn btn-cancel mt-sm">
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
