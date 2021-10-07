import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { IErrorFormLogin, IFormLogin } from '../../interfaces/Forms';
import { validateLoginFields } from '../../helpers/validate-fields';
import { useAppSelector, useAppDispatch } from '../../hooks/Redux';
import { useForm } from '../../hooks/useForm';
import { FullPageLoader } from '../../components/FullPageLoader';
import { GoogleSignIn } from '../../components/GoogleSignIn';
import { googleSignIn, login } from '../../redux/auth/authAction';
import { clearState } from '../../redux/auth/authSlide';
import toast from 'react-hot-toast';

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { isSuccess, isChecking, isError, error } = useAppSelector(
        state => state.auth
    );

    const handleLogin = function () {
        dispatch(clearState());
        dispatch(login({ email, password }));
    };

    const googleSubmit = (idToken: string) => {
        dispatch(clearState());
        dispatch(googleSignIn({ idToken }));
    };

    const { values: formValues, handleChange, handleSubmit, errors } = useForm(
        {
            email: 'admin@example.com',
            password: '',
        },
        handleLogin,
        validateLoginFields
    );

    const { email, password } = formValues as IFormLogin;
    const errorsForm = errors as IErrorFormLogin;

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
            // window.location.reload();
        }

        if (isError) {
            toast.error(error.message);
            dispatch(clearState());
        }
    }, [isSuccess, dispatch, history, isError, error]);

    return (
        <>
            {isChecking && <FullPageLoader />}
            <div className="auth-container">
                <div className="auth-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1 className="headling text-center">SIGN IN</h1>
                        <br />
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                className={
                                    errorsForm.fields.email
                                        ? 'input-error input-field'
                                        : 'input-field'
                                }
                                placeholder="example@example.com"
                                aria-placeholder="Your email"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange}
                                autoFocus
                            />
                            {errorsForm.fields.email ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.email}
                                </p>
                            ) : null}
                        </div>
                        <div className="input-wrapper mb-sm">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={
                                    errorsForm.fields.password
                                        ? 'input-error input-field'
                                        : 'input-field'
                                }
                                placeholder="********"
                                aria-placeholder="Your password"
                                autoComplete="current-password"
                                min="6"
                                value={password}
                                onChange={handleChange}
                            />
                            {errorsForm.fields.password ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.password}
                                </p>
                            ) : null}
                        </div>
                        <button type="submit" className="btn btn-login mb-sm">
                            Sign In
                        </button>
                    </form>
                    <hr className="hr-break" data-break="or" />
                    <GoogleSignIn handleGoogle={googleSubmit} />
                </div>
            </div>
        </>
    );
};
