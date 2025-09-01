import AdminSidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    age: "",
    phoneNumber: "",
    role: "",
    location: "",
  });

  const [editData, setEditData] = useState({ ...adminData });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch admin profile
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
          age: data.age || "",
          phoneNumber: data.phoneNumber || "",
          role: data.role || "",
          location: data.location || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        navigate("/admin-login");
      });
  }, [navigate]);

  // Sync editable state
  useEffect(() => {
    setEditData({ ...adminData });
  }, [adminData]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${api}/api/users/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editData),
      });

      const data = await res.json();

      if (res.ok) {
        setAdminData({ ...editData });
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update profile" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />

      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Admin Profile</h2>

        <form onSubmit={handleSubmit} className="max-w-xl bg-white rounded shadow p-6 space-y-4">
          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`p-3 rounded text-sm ${message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
                }`}
            >
              {message.text}
            </div>
          )}

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
            <label className="block mb-1 text-sm font-medium text-stone-700">Age</label>
            <input
              type="text"
              value={adminData.age}
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
            <label className="block mb-1 text-sm font-medium text-stone-700">Location</label>
            <input
              type="text"
              name="location"
              value={editData.location}
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
            className="w-full bg-stone-800 hover:bg-stone-900 text-white px-6 py-2 rounded font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminProfile;
