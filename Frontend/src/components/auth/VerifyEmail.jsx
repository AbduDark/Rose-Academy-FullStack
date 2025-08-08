import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      console.log("Verifying email:", email, "with PIN:", pin);
      setTimeout(() => {
        if (email === "ahmed.student@example.com" && pin === "123456") {
          setMessage(
            "Your email has been successfully verified! You can now log in."
          );
          setLoading(false);
        } else {
          setError("Invalid email or PIN. Please try again.");
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError(
        "Failed to verify email. Please try again or request a new PIN."
      );
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
      <header className="text-3xl font-semibold text-gray-800 text-center">
        Verify Your Email
      </header>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email (e.g., ahmed.student@example.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="PIN (e.g., 123456)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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
          disabled={loading}
          className={`w-full p-3 text-white text-base font-medium rounded-md transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          Already verified?{" "}
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

export default VerifyEmail;
