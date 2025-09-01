import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DonatePage = () => {
  const [causes, setCauses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const api = "https://api.ummaofrasulullahcharityfoundation.com";

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await fetch(`${api}/api/causes`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch causes");

        const data = await res.json();

        const incompleteCauses = data.filter(
          (cause) => cause.raisedAmount < cause.goalAmount
        );
        setCauses(incompleteCauses);
      } catch (err) {
        console.error("Error fetching causes:", err);
      }
    };

    fetchCauses();
  }, []);

  const formatAmount = (amount) => {
    return typeof amount === "number" ? amount.toFixed(2) : "0.00";
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCauses = causes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(causes.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {/* Main Content */}
      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">Donate to a Cause</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCauses.length === 0 ? (
            <p className="text-center text-stone-500 col-span-full">No causes available at the moment.</p>
          ) : (
            paginatedCauses.map((cause) => {
              const percentage = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));
              return (
                <div key={cause._id} className="bg-white rounded shadow flex flex-col h-full">
                  <img
                    src={cause.images[0]}
                    alt={cause.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-stone-800 mb-2">{cause.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3">{cause.description}</p>
                    <br />
                    <div className="h-2 bg-stone-200 rounded-full mb-2">
                      <div
                        className="h-2 bg-stone-700 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-stone-600 mb-4">
                      Raised: ₦{formatAmount(cause.raisedAmount)} / ₦{formatAmount(cause.goalAmount)}
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/causes/${cause._id}`)}
                        className="w-full flex justify-center items-center gap-2 bg-stone-700 hover:bg-stone-800 text-white px-4 py-2 rounded text-sm"
                      >
                        View Details
                      </button>
                      <Link
                        to={`/donateform/${cause._id}`}
                        className="mt-auto bg-stone-800 hover:bg-stone-900 text-white py-2 rounded font-semibold text-center"
                      >
                        Donate Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-stone-700 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-stone-800">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-stone-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonatePage;
