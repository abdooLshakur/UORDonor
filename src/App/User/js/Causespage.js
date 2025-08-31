import  { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CausesListPage = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const [causes, setCauses] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const causesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await fetch(`${api}/api/causes`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch causes");
        const data = await res.json();
        setCauses(data);
      } catch (err) {
        console.error("Error fetching causes:", err);
      }
    };

    fetchCauses();
  }, []);

  const filteredByType =
    typeFilter === "All"
      ? causes
      : causes.filter((cause) => cause.type === typeFilter);

  const filteredBySearch = filteredByType.filter((cause) =>
    cause.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = filteredBySearch.sort((a, b) => {
    const aComplete = a.raisedAmount >= a.goalAmount;
    const bComplete = b.raisedAmount >= b.goalAmount;
    return aComplete - bComplete;
  });

  const totalPages = Math.ceil(sorted.length / causesPerPage);
  const start = (currentPage - 1) * causesPerPage;
  const paginated = sorted.slice(start, start + causesPerPage);

  const causeTypes = ["All", ...new Set(causes.map((c) => c.type))];

  return (
    <div className="min-w-[100vw] max-w-6xl mx-auto">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-6 mt-[30px]">
        <h2 className="text-3xl font-bold text-stone-800">Causes</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
            className="text-sm border border-stone-300 px-4 py-2 rounded"
          >
            {causeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm border border-stone-300 px-4 py-2 rounded"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 px-6">
        {paginated.map((cause) => {
          const progress = Math.min(
            100,
            Math.round((cause.raisedAmount / cause.goalAmount) * 100)
          );
          return (
            <div
              key={cause._id}
              className="bg-white rounded shadow overflow-hidden flex flex-col justify-between"
            >
              <img
                src={cause.imageUrl}
                alt={cause.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {cause.title}
                </h3>
                <p className="text-sm text-stone-600 mb-2">
                  <strong>Location:</strong> {cause.location || "N/A"}
                </p>
                <p className="text-sm text-stone-600 mb-4 flex-grow">
                  {cause.description}
                </p>
                <div className="mb-2 text-sm">
                  <strong>Raised:</strong> ₦
                  {cause.raisedAmount.toLocaleString()} / ₦
                  {cause.goalAmount.toLocaleString()}
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-stone-800 h-2"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
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
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="text-sm px-3 py-2 rounded bg-stone-300 hover:bg-stone-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="text-sm px-3 py-2 rounded bg-stone-300 hover:bg-stone-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CausesListPage;
