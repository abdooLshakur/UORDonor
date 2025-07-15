import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaHourglassHalf} from "react-icons/fa";
import AdminSidebar from "./Sidebar";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch("https://uor.onrender.com/api/donations", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch donations");
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load donations.");
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await fetch(`https://uor.onrender.com/api/donations/${id}/verify`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to verify donation");
      await fetchDonations();
    } catch (err) {
      console.error(err);
      alert("Verification failed.");
    }
  };

  const filteredDonations = donations.filter((d) =>
    statusFilter === "All" ? true : d.status === statusFilter
  );

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredDonations.slice(start, start + itemsPerPage);

  return (
    <div className="min-h-screen flex">
     <AdminSidebar/>
      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Manage Donations</h2>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="border border-stone-300 px-4 py-2 rounded">
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="py-3 px-4 text-left">Donor</th>
                <th className="py-3 px-4 text-left">Cause</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((donation) => {
                const donor = donation.donorName || donation.userId?.fullName || "Anonymous";
                const cause = donation.causeId?.title || "N/A";
                const amount = donation.amount || 0;
                const date = new Date(donation.createdAt).toLocaleDateString();
                const status = donation.status;

                return (
                  <tr key={donation._id} className="border-b">
                    <td className="py-2 px-4">{donor}</td>
                    <td className="py-2 px-4">{cause}</td>
                    <td className="py-2 px-4 text-right">₦{amount.toLocaleString()}</td>
                    <td className="py-2 px-4">{date}</td>
                    <td className="py-2 px-4">
                      {status === "Verified" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <FaCheckCircle /> Verified
                        </span>
                      ) : (
                        <span className="text-yellow-600 flex items-center gap-1">
                          <FaHourglassHalf /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {status === "Pending" && (
                        <button onClick={() => handleVerify(donation._id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-4">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-stone-300 hover:bg-stone-400 rounded disabled:opacity-50">
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-stone-300 hover:bg-stone-400 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDonations;
