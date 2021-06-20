import { FormEvent } from "react";
import { useForm } from "./hooks/useForm";

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
                    <h1>LOG IN</h1>
                    <br />
                    <div className="input-wrapper mb-md">
                        <input type="text" name="username" className="form-control" placeholder="Username" aria-placeholder="Your user name" autoComplete="off"
                            value={username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper mb-md">
                        <input type="password" name="password" className="form-control" placeholder="Password" aria-placeholder="Your password" autoComplete="off"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="button button-login">Save</button>
                </form>
            </div>
        </div>
    );
}

export default App;