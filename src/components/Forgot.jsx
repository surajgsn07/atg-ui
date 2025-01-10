import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to track form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the form is being submitted
    try {
      const response = await axios.post(
        "https://atg-3hp6.onrender.com/auth/forgetPassword",
        { email }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false); // Set loading state back to false after the request is completed
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 px-4 rounded w-full"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
