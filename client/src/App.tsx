import { FormEvent } from "react";
import { useForm } from "./hooks/useForm";
import { User as UserIcon, Mail as MailIcon } from 'react-feather';
import logo from './assets/logo.svg';

interface FormValues {
    username?: string;
    password?: string;
}

const App = () => {
    const [formValues, handleInputChange] = useForm({
        username: '',
        password: ''
    });

    const { username, password }: FormValues = formValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="logo">
                        <img src={logo} alt="" style={{height: '48px'}}/>
                    </div>
                    <h1 className="headling">LOG IN</h1>
                    <br />
                    <div className="input-wrapper mb-sm">
                        <div className="input-container">
                            <div className="input-icon">
                                <UserIcon color="black" size={20} />
                            </div>
                            <input type="text" name="username" className="input-field" placeholder="Username" aria-placeholder="Your user name" autoComplete="off"
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
                            <input type="password" name="password" className="input-field" placeholder="Password" aria-placeholder="Your password" autoComplete="off"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="button button-login">ENTER</button>
                </form>
            </div>
        </div>
    );
}

export default App;