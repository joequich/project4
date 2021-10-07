import React, { FormEvent } from 'react'
import { validateProductFields } from '../../helpers/validate-fields';
import { useForm } from '../../hooks/useForm';
import { IFormAddProduct } from '../../interfaces/Forms';

export const ProductsManagePage = () => {
    
    const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };
    
    const { values: formValues, handleChange, handleSubmit } = useForm(
        {
            product: '',
            description: '',
            stock: 0,
            price: 0,
        },
        handleAddProduct,
        validateProductFields
    );

    const { product, description, stock, price } = formValues as IFormAddProduct;
        
    return (
        <div className="products-container">
            <div className="products-header">
                <span className="products-header__title">Add Products</span>
                <hr />
            </div>
            <form onSubmit={handleSubmit}>
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
                </div>
                <div className="input-wrapper mb-sm">
                    <label htmlFor="stock">Stock: </label>
                    <input
                        type="number"
                        name="stock"
                        className="input-field"
                        placeholder="Stock"
                        aria-placeholder="Product Stock"
                        autoComplete="off"
                        value={stock}
                        onChange={handleChange}
                        autoFocus
                    />
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
                </div>
                <button type="submit" className="btn mt-sm">
                    Cancel
                </button>
                <button type="submit" className="btn mt-sm">
                    Save
                </button>
            </form>
        </div>
    )
}
