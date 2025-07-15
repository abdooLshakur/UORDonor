import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

const DonorProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://uor.onrender.com/api/users/donor", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        navigate("/Donorlogin");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
    };

    try {
      const res = await fetch("https://uor.onrender.com/api/users/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar />
      <main className="min-w-[100vw] lg:min-w-[85vw] max-w-full flex-1 bg-stone-100 p-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">My Profile</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          <div className="flex flex-col">
            <label className="text-stone-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-stone-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-stone-700 mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full md:w-auto px-6 py-2 rounded font-semibold text-white ${
                loading
                  ? "bg-stone-500 cursor-not-allowed"
                  : "bg-stone-800 hover:bg-stone-900"
              }`}
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DonorProfile;
