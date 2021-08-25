import React, { FormEvent } from 'react';
import { Lock as LockIcon, Mail as MailIcon } from 'react-feather';
import { useForm } from '../../hooks/useForm';

interface FormValues {
    email?: string;
    password?: string;
}

export const LoginScreen = () => {
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const { email, password }: FormValues = formValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };
    return (
        <div className="content">

            <div className="auth-container">
                <div className="auth-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1 className="headling">SIGN IN</h1>
                        <br />
                        <div className="input-wrapper mb-sm">
                            <div className="input-container">
                                <div className="input-icon">
                                    <MailIcon color="black" size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    className="input-field"
                                    placeholder="example@example.com"
                                    aria-placeholder="Your email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-wrapper mb-sm">
                            <div className="input-container">
                                <div className="input-icon">
                                    <LockIcon color="black" size={20} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-field"
                                    placeholder="********"
                                    aria-placeholder="Your password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn button-login">
                            ENTER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
