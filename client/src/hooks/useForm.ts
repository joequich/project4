import { ChangeEvent, useState } from "react";

export const useForm: (initialState?: object) => [values: object, handleInputChange: ({target}: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => void] = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const handleInputChange = ({ target }: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange];
}