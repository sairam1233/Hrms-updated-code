import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import Cookies from "js-cookie";

import "./index.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      company: "",
      gender: "",
      dateofbirth: "",
      country: "",
      Aboutyourself: "",
      showSubmitError: false,
      errorMsg: "",
      redirectToHome: false,
      redirectToLogin: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmitSuccess = () => {
    this.setState({ redirectToLogin: true });
  };

  handleFormSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    const { fullname, email, company, gender, dateofbirth, country, Aboutyourself } = this.state;

    // Check if any required field is empty and show an error message if so
    if (!fullname || !email || !company || !gender || !dateofbirth || !country || !Aboutyourself) {
      this.handleFormSubmitFailure("All fields are required.");
      return;
    }

    // Prepare user data to be sent to the server
    const userDetails = { fullname, email, company, gender, dateofbirth, country, Aboutyourself };

    // Define the API endpoint and request options
    const url = "http://localhost:5000/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that we're sending JSON data
      },
      body: JSON.stringify(userDetails), // Convert the user details to JSON
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json(); // Parse the JSON response

      // Handle response based on status
      if (response.ok) {
        this.handleFormSubmitSuccess(); // On success, redirect to login page
      } else {
        this.handleFormSubmitFailure(data.message || "Something went wrong."); // Show error message on failure
      }
    } catch (error) {
      this.handleFormSubmitFailure("Something went wrong. Please try again.");
    }
  };

  onHandleLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  render() {
    const {
      fullname,
      email,
      company,
      gender,
      dateofbirth,
      country,
      Aboutyourself,
      showSubmitError,
      errorMsg,
      redirectToLogin,
    } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/" />;
    }

    return (
      <div className="register-form-wrapper">
        <div className="register-form-content">
          <div className="register-form-left">
            <h1 className="form-title">Sign up</h1>
            <p className="form-description">
              Already have an account?
              <span className="login-link" onClick={this.onHandleLogin}>
                Sign in here
              </span>
            </p>
          </div>
          <form className="register-form" onSubmit={this.handleFormSubmission}>
            <hr className="form-separator" />
            {showSubmitError && <p className="form-error-message">{errorMsg}</p>} {/* Display error message if submission failed */}
            <div className="form-input-group">
              <label className="input-label" htmlFor="fullname">
                FULLNAME
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="input-field"
                value={fullname}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="email">
                WORK EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                value={email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="gender">
                GENDER
              </label>
              <select
                id="gender"
                name="gender"
                className="select-field"
                value={gender}
                onChange={this.handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="dateofbirth">
                DATE OF BIRTH
              </label>
              <input
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                className="input-field"
                value={dateofbirth}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="country">
                COUNTRY
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="input-field"
                value={country}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="company">
                COMPANY
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="input-field"
                value={company}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label className="input-label" htmlFor="aboutyourself">
                ABOUT YOURSELF
              </label>
              <textarea
                id="aboutyourself"
                name="Aboutyourself"
                className="textarea-field"
                value={Aboutyourself}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
