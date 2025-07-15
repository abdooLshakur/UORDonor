import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const api = "https://uor.onrender.com";

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password has been reset!");
        setTimeout(() => navigate("/donor-login"), 1500);
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-stone-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-stone-300">
        <h2 className="text-2xl font-bold text-center text-stone-800 mb-4">
          Reset Password
        </h2>
        <p className="text-center text-sm text-stone-600 mb-6">
          Please enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
