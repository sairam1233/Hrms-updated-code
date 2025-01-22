import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import Cookies from "js-cookie";

import "./index.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    company: "",
    gender: "",
    dateofbirth: "",
    country: "",
    Aboutyourself: "",
  });

  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = () => {
            const token = Cookies.get('token');
            if (token) {
                navigate('/home');
            }
        };

        fetchUsername();
    }, [navigate]);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmitSuccess = () => {
    setRedirectToLogin(true);
  };

  const handleFormSubmitFailure = (message) => {
    setShowSubmitError(true);
    setErrorMsg(message);
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    const { fullname, email, company, gender, dateofbirth, country, Aboutyourself } = formData;

    // Check if any required field is empty and show an error message if so
    if (!fullname || !email || !company || !gender || !dateofbirth || !country || !Aboutyourself) {
      handleFormSubmitFailure("All fields are required.");
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
        handleFormSubmitSuccess(); // On success, redirect to login page
      } else {
        handleFormSubmitFailure(data.message || "Something went wrong."); // Show error message on failure
      }
    } catch (error) {
      handleFormSubmitFailure("Something went wrong. Please try again.");
    }
  };

  const onHandleLogin = () => {
    setRedirectToLogin(true);
  };

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
            <span className="login-link" onClick={onHandleLogin}>
              Sign in here
            </span>
          </p>
        </div>
        <form className="register-form" onSubmit={handleFormSubmission}>
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
              value={formData.fullname}
              onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.gender}
              onChange={handleInputChange}
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
              value={formData.dateofbirth}
              onChange={handleInputChange}
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
              value={formData.country}
              onChange={handleInputChange}
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
              value={formData.company}
              onChange={handleInputChange}
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
              value={formData.Aboutyourself}
              onChange={handleInputChange}
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

export default RegisterForm;
