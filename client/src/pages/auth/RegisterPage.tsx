import React, { FormEvent, useState } from 'react'
import { AlertMessage } from '../../components/AlertMessage';
import { FullPageLoader } from '../../components/FullPageLoader';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { useForm } from '../../hooks/useForm';
import { register } from '../../redux/auth/authAction';
import { clearState } from '../../redux/auth/authSlide';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const { isChecking, isError, error } = useAppSelector(
        (state) => state.auth
    );
    const [success, setSuccess] = useState(false);
    const [formValues, handleInputChange, resetValues] = useForm({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formValues as FormValues;

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearState());
        setSuccess(false);
        dispatch(register({ username, email, password} ))
            .then(() => {
                setSuccess(true);
                resetValues();
            });
    };
    return (
        <>
            {isChecking && <FullPageLoader />}
            <div className="auth-container">
                <div className="auth-wrapper">
                    <form onSubmit={handleRegister}>
                        <h1 className="headling text-center">SIGN UP</h1>
                        <br />
                        {isError && (
                            <AlertMessage error={error}/>
                        )}
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
        </>
    )
}
