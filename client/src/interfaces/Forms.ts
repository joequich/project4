import { ChangeEvent, FormEvent } from "react";


export type FieldValues = Record<string, any>;

export type IFormsReturn = [values: FieldValues, handleChange: ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, resetValues: () => void, handleSubmit:(e: FormEvent<HTMLFormElement>) => void, errors: {}]


export interface IFormLogin {
    email: string;
    password: string;
}

export interface IErrorFormLogin {
    fields: IFormLogin;
}

export interface IFormRegister {
    username: string
    email: string;
    password: string;
}

export interface IErrorFormRegister {
    fields: IFormRegister;
}

export interface IFormAddProduct {
    product: string;
    description: string
    stock: string;
    price: string;
}