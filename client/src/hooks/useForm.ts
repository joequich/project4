import { ChangeEvent, useState } from "react";

export type FieldValues = Record<string, any>;

// export const useForm: ({ defaultValues?: FieldValues}) => [values: FieldValues, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void] = ({defaultValues = {}}) => {
// export const useForm: ({ defaultValues: Record<string, any>}) => [values: Record<string, any>, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void]  = ({ defaultValues = {} }) => {
// export const useForm = ({ defaultValues = {} }: { defaultValues: any}) => {
//     const [values, setValues] = useState(defaultValues);
    // export const useForm: (initialState?: object) => [values: object, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void] = (initialState = {}) => {
    //     const [values, setValues] = useState(initialState);
export const useForm: (initialState?: any) => [values: any, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void] = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const handleInputChange = ({ target }: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange];
}