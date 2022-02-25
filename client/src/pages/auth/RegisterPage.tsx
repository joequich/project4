import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { IErrorFormRegister, IFormRegister } from '../../interfaces/Forms';
import { validateRegisterFields } from '../../helpers/validate-fields';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { useForm } from '../../hooks/useForm';
import { FullPageLoader } from '../../components/FullPageLoader';
import { fetchAuthRegister } from '../../redux/auth/authAction';
import { clearState } from '../../redux/auth/authSlide';

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const { isSuccess, isChecking, isError, error } = useAppSelector(
        state => state.auth
    );

    const handleRegister = () => {
        dispatch(fetchAuthRegister({ username, email, password }));
    };

    const { values: formValues, handleChange, handleSubmit, errors, } = useForm(
        {
            username: '',
            email: '',
            password: '',
        },
        handleRegister,
        validateRegisterFields
    );

    const { username, email, password } = formValues as IFormRegister;
    const errorsForm = errors as IErrorFormRegister;

    useEffect(() => {
        if (isSuccess) {
            toast.success('User registered successfully!!');
            dispatch(clearState());
        }

        if (isError) {
            toast.error(error.message);
            dispatch(clearState());
        }
    }, [dispatch, error, isError, isSuccess]);

    return (
        <>
            {isChecking && <FullPageLoader />}
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
                                className={
                                    errorsForm.fields.username
                                        ? 'input-error input-field'
                                        : 'input-field'
                                }
                                placeholder="username*"
                                aria-placeholder="Your user name"
                                autoComplete="username"
                                value={username}
                                onChange={handleChange}
                                autoFocus
                            />
                            {errorsForm.fields.username ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.username}
                                </p>
                            ) : null}
                        </div>
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
                                placeholder="email Address*"
                                aria-placeholder="Your email address"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange}
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
                                placeholder="password*"
                                aria-placeholder="Your password"
                                autoComplete="new-password"
                                value={password}
                                onChange={handleChange}
                            />
                            {errorsForm.fields.password ? (
                                <p className="msg-error ">
                                    {errorsForm.fields.password}
                                </p>
                            ) : null}
                        </div>
                        <button type="submit" className="btn btn-login mt-sm">
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
