import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { validateProductFields } from '../../helpers/validate-fields';
import { useForm } from '../../hooks/useForm';
import { IFormAddProduct } from '../../interfaces/Forms';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { FiUploadCloud as UploadCloudIcon } from 'react-icons/fi';

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

    const {
        product,
        description,
        stock,
        price,
    } = formValues as IFormAddProduct;

    interface IFile {
        preview: string;
        name: string;
    }

    const [files, setFiles] = useState<IFile[]>([]);
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFiles(
            acceptedFiles.map((file: any) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        );
    }, []);

    const options: DropzoneOptions = {
        accept: 'image/*',
        onDrop,
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
    };

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone(
        options
    );

    const thumbs = files.map((file, idx) => (
        <img key={idx} alt="aaa" src={file.preview} className="dropzone-img" />
    ));
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <div className="products-container">
            <div className="products-header">
                <span className="products-header__title">Add Products</span>
                <hr />
            </div>

            <div
                className={
                    thumbs.length === 0
                        ? 'dropzone-area'
                        : 'dropzone-area active'
                }
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {!(thumbs.length === 0) ? (
                    thumbs
                ) : (
                    <>
                    <UploadCloudIcon size={100} color=""/>
                    <span>Drop an Image here</span>
                    <button type="button" onClick={open}>
                        Browse File
                    </button>
                    </>
                )}
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
    );
};
