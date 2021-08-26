import React, { FormEvent } from 'react'
import { useForm } from '../../hooks/useForm';

interface FormValues {
    username?: string;
    email?: string;
    password?: string;
}

export const RegisterScreen = () => {
    const [formValues, handleInputChange] = useForm({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password }: FormValues = formValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };
    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <form onSubmit={handleSubmit}>
                    <h1 className="headling text-center">SIGN UP</h1>
                    <br />
                    <div className="input-wrapper mb-sm">
                    <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="input-field"
                            placeholder="username*"
                            aria-placeholder="Your user name"
                            autoComplete="off"
                            value={username}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </div>
                    <div className="input-wrapper mb-sm">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="input-field"
                            placeholder="email Address*"
                            aria-placeholder="Your email address"
                            autoComplete="off"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper mb-sm">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input-field"
                            placeholder="password*"
                            aria-placeholder="Your password"
                            autoComplete="off"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-login mt-sm">
                        Create account
                    </button>
                </form>
            </div>
        </div>
    )
}
