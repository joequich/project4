import { unwrapResult } from '@reduxjs/toolkit';
import React, { FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FullPageLoader } from '../../components/FullPageLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useForm } from '../../hooks/useForm';

import { login } from '../../redux/auth/authAction';
import { clearState } from '../../redux/auth/authSlide';
// interface RootState {  auth: boolean}
interface FormsValues {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const history = useHistory();
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const { logged, isChecking, isError, error } = useAppSelector(
        state => state.auth
    );

    const dispatch = useAppDispatch();

    const { email, password } = formValues as FormsValues;
    // const email = 'admin@example.com';
    // const password = '123456';

    useEffect(() => {
        if (logged) {
            history.push('/products');
            window.location.reload();
        }

        if (isError) {
            console.log('clearState')
            dispatch(clearState);
        }
    }, [logged, isChecking, isError, dispatch, history])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(login({ email, password }));
            // .then(unwrapResult)
            // .then(() => {
            //     history.push('/products');
            //     window.location.reload();
            // });
        // .catch(() => {
        //     setLoading(false);
        // });
    };
    return (
        <>
            {isChecking && <FullPageLoader />}
            <div className="auth-container">
                <div className="auth-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1 className="headling text-center">SIGN IN</h1>
                        <br />
                        {isError && (
                            <div className="alert alert-danger mb-sm">
                                <span>{error}</span>
                            </div>
                        )}
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
        </>
    );
};
