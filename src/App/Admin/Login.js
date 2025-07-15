import React, { useEffect, useState } from "react";
import { FaChartBar, FaDonate, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch donors");
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredDonors = donors.filter(d =>
    d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredDonors.slice(start, start + itemsPerPage);

  return (
    <div className="min-h-screen flex">
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white bg-stone-800 p-2 rounded"
        >
          <FaBars size={20} />
        </button>
      </div>

      <aside
        className={`fixed md:static min-h-screen z-40 top-0 left-0 h-full w-64 bg-stone-800 text-white flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="text-center text-2xl font-bold py-6 border-b border-stone-700">
            UOR Admin
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link to="/admin-dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
              <FaChartBar /> Dashboard
            </Link>
            <Link to="/admin-donations" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
              <FaDonate /> Donations
            </Link>
            <Link to="/admin-users" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
              <FaUser /> Donors
            </Link>
            <Link to="/admin-causes" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
              <FaDonate /> Causes
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-stone-700">
          <button className="flex items-center gap-3 p-2 w-full rounded hover:bg-stone-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Manage Donors</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-stone-300 px-4 py-2 rounded w-full md:w-1/3"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-stone-300 hover:bg-stone-400 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-stone-300 hover:bg-stone-400 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDonors;
