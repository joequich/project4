import { ChangeEvent, useState } from "react";

export const useForm: (initialState?: object) => [values: object, handleInputChange: ({target}: ChangeEvent <HTMLInputElement>) => void] = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const handleInputChange = ({ target }: ChangeEvent <HTMLInputElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange];
}