import  { useEffect, useState } from "react";
import AdminSidebar from "./Sidebar";

const AdminUsers = () => {
  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;
  const api = "https://api.ummaofrasulullahcharityfoundation.com";

  const fetchDonors = async () => {
    try {
      const res = await fetch(
        `${api}/api/users?page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchQuery)}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch donors");
      const data = await res.json();
      setDonors(data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [currentPage, searchQuery]);

  return (
    <div className="min-h-screen flex">
      <AdminSidebar/>

      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Donors List</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search donors by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-stone-300 px-4 py-2 rounded w-full md:w-1/2"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(donors) && donors.length > 0 ? (
                donors.map((donor) => (
                  <tr key={donor._id} className="border-b">
                    <td className="py-2 px-4">{donor.fullName}</td>
                    <td className="py-2 px-4">{donor.email}</td>
                    <td className="py-2 px-4">{new Date(donor.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-stone-500">
                    No donors found.
                  </td>
                </tr>
              )}
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
            <span>Page {currentPage} of {totalPages}</span>
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

export default AdminUsers;
