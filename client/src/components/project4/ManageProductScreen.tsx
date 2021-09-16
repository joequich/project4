import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

interface FormValues {
    product?: string;
    description?: string;
    stock?: string;
    price?: string;
}

export const ManageProductScreen = () => {
    const [formValues, handleInputChange] = useForm({
        product: '',
        description: '',
        stock: '0',
        price: '0',
    });

    const { product, description, stock, price }: FormValues = formValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
