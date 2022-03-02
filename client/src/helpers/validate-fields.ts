import { IFormAddProduct, IFormLogin, IFormRegister } from "../interfaces/Forms";


export const validateLoginFields = (values: IFormLogin) => {
    let errors = {} as IFormLogin
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }
    return errors;
};


export const validateRegisterFields = (values: IFormRegister) => {
    let errors = {} as IFormRegister;

    if (!values.username.trim()) {
        errors.username = 'Username required';
    }

    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }
    return errors;
};

export const validateProductFields = (values: IFormAddProduct) => {
    let errors = {} as IFormAddProduct;

    if (!values.name.trim()) {
        errors.name = 'Product name required';
    }

    if (!values.description.trim()) {
        errors.description = 'Description required';
    }

    if (isNaN(Number(values.stock))) {
        errors.stock = 'Number value is required';
    } else if (Number(values.stock) < 0) {
        errors.stock = 'Stock cannot be negative';
    }

    if (isNaN(Number(values.price))) {
        errors.price = 'Number value is required';
    } else if (Number(values.price) < 0) {
        errors.price = 'Price cannot be negative';
    }

    return errors;
};
