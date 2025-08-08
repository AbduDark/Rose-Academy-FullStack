import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Password reset requested for:", email);
      setMessage("If the email exists, a password reset link has been sent.");
      setError("");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
      <header className="text-3xl font-semibold text-gray-800 text-center">
        Forgot Password
      </header>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {message && (
          <div className="text-green-600 text-sm text-center mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          Send Reset Link
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={handleBackToLogin}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
