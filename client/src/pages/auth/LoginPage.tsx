import React, { FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AlertMessage } from '../../components/AlertMessage';
import { FullPageLoader } from '../../components/FullPageLoader';
import { useForm } from '../../hooks/useForm';
import { useAppSelector, useAppDispatch} from '../../hooks/Redux';
import { login } from '../../redux/auth/authAction';
import { clearState } from '../../redux/auth/authSlide';
interface FormsValues {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { logged, isChecking, isError, error } = useAppSelector(
        (state) => state.auth
    );
    const [formValues, handleInputChange] = useForm({
        email: 'admin@example.com',
        password: '',
    });
    const { email, password } = formValues as FormsValues;

    useEffect(() => {
        if (logged) {
            history.push('/products');
            window.location.reload();
        }
    }, [logged, dispatch, history]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearState());
        dispatch(login({ email, password }));
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
                            <AlertMessage error={error}/>
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
