import { Component } from "react";
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

class ForgotPassword extends Component {
  state = {
    email:'',
    redirectToHome: false, // Added to handle redirection
  };

  

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  

  renderUsernameField = () => {
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field2"
          value={email}
          onChange={this.onChangeEmail}
          required
        />
      </>
    );
  };

  render() {
    return (
      <div className="login-form-container">
        <div className="sign-container">
            <div className="flex-1">
              <h1 className="heading">Forgot Password?</h1>
              <p className="pa1">Remember your password? <Link className="lk" to="/"><span className="sp1">Sign in here</span></Link></p>
            </div>
            <form className="form-container1" >
            <div className="input-container">{this.renderUsernameField()}</div>
            <button type="submit" className="login-button1">
                Submit
            </button>
            </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;