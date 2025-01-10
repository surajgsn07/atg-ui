import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state to track the form submission process

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is being submitted
    try {
      const response = await axios.post(
        "https://atg-3hp6.onrender.com/auth/login",
        formData
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border w-full p-2 rounded mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <div className="spinner-border mx-auto animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Login"
          )}
        </button>
        <div className="mt-4 text-sm text-center">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
