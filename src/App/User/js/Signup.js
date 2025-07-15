import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DonorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),

      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setFormData({ fullname: "", email: "", password: "", phoneNumber: "", confirmPassword: "" });
        navigate("/Donorlogin");
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false); // end loading
  };


  return (
    <div className="min-w-[100vw] min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">Donor Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
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
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-semibold px-4 py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        <p className="text-sm text-stone-600 text-center mt-4">
          Already have an account? <Link to="/Donorlogin"><span className="text-stone-800 font-medium underline cursor-pointer">Sign in</span></Link>
        </p>
      </div>
    </div>
  );
};

export default DonorSignUp;
