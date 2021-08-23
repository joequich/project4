import React, { FormEvent } from 'react'
import { User as UserIcon, Mail as MailIcon, Lock as LockIcon } from 'react-feather';
import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logo.svg';

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
        <div className="login-container">
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="logo">
                        <img src={logo} alt="logo" style={{ height: '48px' }} />
                    </div>
                    <h1 className="headling">SIGN UP</h1>
                    <br />
                    <div className="input-wrapper mb-sm">
                        <div className="input-container">
                            <div className="input-icon">
                                <UserIcon color="black" size={20} />
                            </div>
                            <input
                                type="text"
                                name="username"
                                className="input-field"
                                placeholder="Username*"
                                aria-placeholder="Your user name"
                                autoComplete="off"
                                value={username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper mb-sm">
                        <div className="input-container">
                            <div className="input-icon">
                                <MailIcon color="black" size={20} />
                            </div>
                            <input
                                type="text"
                                name="email"
                                className="input-field"
                                placeholder="Email Address*"
                                aria-placeholder="Your email address"
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
                                placeholder="Password*"
                                aria-placeholder="Your password"
                                autoComplete="off"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="button button-login">
                        ENTER
                    </button>
                </form>
            </div>
        </div>
    )
}
