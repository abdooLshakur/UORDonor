import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "./Sidebar";

const AdminCauses = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const [causes, setCauses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newCause, setNewCause] = useState({
    title: "",
    description: "",
    location: "",
    goalAmount: 0,
    raisedAmount: 0,
    type: "",
    isCompleted: false,
    images: [],
  });

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    try {
      const res = await fetch(`${api}/api/causes`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch causes");
      const data = await res.json();
      setCauses(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load causes");
    }
  };

  const handleFileChange = (e) => {
    setNewCause((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSave = async () => {
    try {
      if (!newCause.title || !newCause.goalAmount || !newCause.type) return;

      const formData = new FormData();
      formData.append("title", newCause.title);
      formData.append("description", newCause.description);
      formData.append("location", newCause.location);
      formData.append("goalAmount", newCause.goalAmount);
      formData.append("raisedAmount", newCause.raisedAmount);
      formData.append("type", newCause.type);
      formData.append("isCompleted", newCause.isCompleted);

      newCause.images.forEach((file) => {
        formData.append("images", file);
      });

      const method = editIndex !== null ? "PUT" : "POST";
      const url = editIndex !== null
        ? `${api}/api/causes/${causes[editIndex]._id}`
        : `${api}/api/causes/add`;


      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(editIndex !== null ? "Cause updated successfully" : "Cause added successfully");
      fetchCauses();
      setShowModal(false);
      setEditIndex(null);
      setNewCause({
        title: "",
        location: "",
        description: "",
        goalAmount: 0,
        raisedAmount: 0,
        type: "",
        isCompleted: false,
        images: [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save cause");
    }
  };

  const handleEdit = (index) => {
    const cause = causes[index];
    setNewCause({
      ...cause,
      images: [],
    });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cause?")) return;
    try {
      const res = await fetch(`${api}/api/causes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Cause deleted successfully");
      fetchCauses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete cause");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCause({
      ...newCause,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <AdminSidebar />

      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Manage Causes</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            Add New
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {["Incomplete Causes", "Completed Causes"].map((title, i) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-stone-700 mb-2">{title}</h3>
              <div className="bg-white shadow rounded overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-stone-100 text-stone-600">
                    <tr>
                      <th className="text-left px-4 py-2">Title</th>
                      <th className="text-left px-4 py-2">Type</th>
                      <th className="text-right px-4 py-2">Raised / Goal</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {causes
                      .filter((c) => (i === 0 ? !c.isCompleted : c.isCompleted))
                      .map((cause, index) => (
                        <tr key={cause._id} className="border-b">
                          <td className="px-4 py-2">{cause.title}</td>
                          <td className="px-4 py-2">{cause.type}</td>
                          <td className="px-4 py-2 text-right">
                            ₦{cause.raisedAmount.toLocaleString()} / ₦{cause.goalAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600 hover:underline mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(cause._id)}
                              className="text-red-600 hover:underline"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-20">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg relative">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                }}
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-700"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-stone-800 mb-4">
                {editIndex !== null ? "Edit Cause" : "Add New Cause"}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="title"
                  value={newCause.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border border-stone-300 rounded px-4 py-2"
                />
                <textarea
                  name="description"
                  value={newCause.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border border-stone-300 rounded px-4 py-2"
                ></textarea>
                <input
                  type="text"
                  name="location"
                  value={newCause.location}
                  onChange={handleChange}
                  placeholder="Cause Location"
                  className="border px-4 py-2 rounded"
                />
                <input
                  name="goalAmount"
                  value={newCause.goalAmount}
                  onChange={handleChange}
                  placeholder="Goal Amount"
                  type="number"
                  className="border border-stone-300 rounded px-4 py-2"
                />
                <input
                  name="raisedAmount"
                  value={newCause.raisedAmount}
                  onChange={handleChange}
                  placeholder="Raised Amount"
                  type="number"
                  className="border border-stone-300 rounded px-4 py-2"
                />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="border border-stone-300 rounded px-4 py-2"
                />
                {newCause.images.length > 0 && (
                  <ul className="text-sm text-stone-700 mt-2">
                    {newCause.images.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
                <input
                  name="type"
                  value={newCause.type}
                  onChange={handleChange}
                  placeholder="Type (e.g. Food, Water)"
                  className="border border-stone-300 rounded px-4 py-2"
                />
                <label className="flex items-center gap-2">
                  <input
                    name="isCompleted"
                    type="checkbox"
                    checked={newCause.isCompleted}
                    onChange={handleChange}
                  />
                  <span>Completed</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={!newCause.title || !newCause.goalAmount || !newCause.type}
                  className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCauses;
