import React, { Component } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            showpass: "password",
            redirectTo: null,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)
            console.log(response)
            if (response.ok) {
                Cookies.set('token', data.token, { expires: 1 });
                this.setState({ message: 'Login successful!' });

                if (data.loginDateTime) {
                    Cookies.set('loginDate', data.loginDateTime.logDate, { expires: 1 });
                    Cookies.set('loginTime', data.loginDateTime.logTime, { expires: 1 });
                }

                this.setState({ redirectTo: '/home' });
            } else {
                this.setState({ message: data.message || 'Login failed. Please try again.' });
            }
        } catch (error) {
            this.setState({ message: 'Login failed. Please try again.' });
        }
    };

    onHandleSignup = () => {
        this.setState({ redirectTo: '/register' });
    };

    onShowPass = () => {
        this.setState((prevState) => ({
            showpass: prevState.showpass === "password" ? "text" : "password",
        }));
    };

    render() {
        const { email, password, message, showpass, redirectTo } = this.state;

        if (redirectTo) {
            return <Navigate to={redirectTo} />;
        }

        return (
            <div className="login-form">
                <form className="login-form__container" onSubmit={this.handleLogin}>
                    <div className="login-form__input-container">
                        <label className="login-form__label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleInputChange}
                            className="login-form__input"
                            required
                        />
                    </div>
                    <div className="login-form__input-container">
                        <label className="login-form__label">Password:</label>
                        <input
                            type={showpass}
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                            className="login-form__input"
                            required
                        />
                    </div>

                    <div className="login-form__show-password">
                        <div className="login-form__toggle-password">
                            <input
                                type="checkbox"
                                id="show-password"
                                onChange={this.onShowPass}
                                aria-label="Toggle password visibility"
                                className="ck"
                            />
                            <label className="login-form__checkbox-label" htmlFor="show-password">
                                Show Password
                            </label>
                        </div>
                        <div className="login-form__forgot-password">
                            <Link className="login-form__link" to="/forgotpassword">Forgot Password?</Link>
                        </div>
                    </div>


                    {message && <p className="login-form__error">{message}</p>}
                    <button type="submit" className='btn'></button>
                    <button
                        type="type"
                        className="login-form__button"
                        onClick={this.onHandleSignup}
                    >
                        Signup
                    </button>
                    
                </form>
            </div>
        );
    }
}

export default function WrappedLoginForm() {
    const navigate = useNavigate();
    return <LoginForm navigate={navigate} />;
}
