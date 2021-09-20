import { ChangeEvent, useState } from "react";

type FieldValues = Record<string, any>;

export const useForm: (initialState?: FieldValues) => [values: FieldValues, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void] = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const handleInputChange = ({ target }: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange];
}