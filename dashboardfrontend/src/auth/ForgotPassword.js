import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// useState(""): Initializes the email state to an empty string and the
//  message state to an empty string.
// navigate variable with the useNavigate hook, which provides a
// function to navigate to different routes in the application.
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // This handleChange function is used to update the email state in
  // response to changes in an input field's value
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // This handleSubmit function is called when the form is submitted. It prevents the default form submission behavior (e.preventDefault()) and then sends a POST request to the server to initiate the password reset process.
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/forgotPassword",
        { email }
      );
      setMessage(response.data.message);
      const { resetToken } = response.data;
      navigate(`/resetPassword?token=${resetToken}`);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };


  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Forgot Password
            </button>
          </div>
        </form>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
