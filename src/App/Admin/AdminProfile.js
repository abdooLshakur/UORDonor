import AdminSidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });
  const [editData, setEditData] = useState({ ...adminData });

  useEffect(() => {
    fetch(`${api}/api/users/donor`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminData({
          fullName: data.fullName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          role: data.role || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        navigate("/admin-login");
      });
  }, [navigate]);

  useEffect(() => {
    setEditData({ ...adminData });
  }, [adminData]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/api/users/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        setAdminData({ ...editData });
        toast.success("Profile updated successfully!");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />

      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Admin Profile</h2>

        <form onSubmit={handleSubmit} className="max-w-xl bg-white rounded shadow p-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-stone-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleChange}
              className="w-full border border-stone-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              value={editData.email}
              disabled
              className="w-full bg-stone-100 px-4 py-2 rounded border border-stone-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-stone-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={editData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-stone-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-stone-700">Role</label>
            <input
              type="text"
              value={editData.role}
              disabled
              className="w-full bg-stone-100 px-4 py-2 rounded border border-stone-300"
            />
          </div>
          <button
            type="submit"
            className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-2 rounded font-semibold"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminProfile;
