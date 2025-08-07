import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const DonorLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        setError("");

        // Wait 1.5 seconds before navigating
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(result.message || "Login failed.");
        setSuccess("");
      }
    } catch (err) {
      setError("Something went wrong.");
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <div className="min-w-[100vw] min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">Donor Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />

          <div className="text-right text-sm">
            <Link to={"/forgot-password"}>
            <span className="text-stone-600 hover:underline cursor-pointer">Forgot password?</span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-semibold px-4 py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Message Section (below button) */}
          <div className="mt-2 text-center">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </div>
        </form>

        <p className="text-sm text-stone-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link to={"/Donorsignup"}>
            <span className="text-stone-800 font-medium underline cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DonorLogin;
