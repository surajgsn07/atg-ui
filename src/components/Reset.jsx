import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL params
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("Invalid or missing token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://atg-3hp6.onrender.com/auth/reset-password/${token}`,
        { newPassword }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
