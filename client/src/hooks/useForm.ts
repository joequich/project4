import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type FieldValues = Record<string, any>;
interface IErrors {
    fields?: Record<string,any>
}
export const useForm: (initFieldValues:FieldValues, callback: Function, validate: Function) => 
{values: FieldValues, handleChange: ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, resetValues: (values?: FieldValues) => void, handleSubmit:(e: FormEvent<HTMLFormElement>) => void, errors: {}} = (initFieldValues:FieldValues, callback: Function, validate: Function) => {
    const [values, setValues] = useState(initFieldValues);
    const [errors, setErrors] = useState<IErrors>({fields: {}});
    const [isSubmited, setIsSubmited] = useState(false)
    
    const handleChange = ({ target }: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({fields: validate(values)});
        setIsSubmited(true);
    };

    const resetValues = (values = initFieldValues) => {
        setValues(values);
    }

    useEffect(() => {
        if (errors.fields && Object.keys(errors.fields).length === 0 && isSubmited) {
            callback();
        }
    }, [errors])

    return {values, handleChange, resetValues, handleSubmit, errors};
}