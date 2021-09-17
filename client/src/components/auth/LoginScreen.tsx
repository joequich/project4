import React, { FormEvent } from 'react';
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
            <div className="auth-container">
                <div className="auth-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1 className="headling text-center">SIGN IN</h1>
                        <br />
                        <div className="alert alert-danger mb-sm">
                            <span>Incorrect email or password.</span>
                        </div>
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="input-field"
                                placeholder="example@example.com"
                                aria-placeholder="Your email"
                                autoComplete="off"
                                value={email}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </div>
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="password">Password</label>
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
                        <button type="submit" className="btn btn-login mt-sm">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
    );
};
