import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDonate } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CauseDetailPage = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [cause, setCause] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCause = async () => {
      try {
        const res = await fetch(`${api}/api/causes/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch cause");
        const data = await res.json();
        setCause(data);
      } catch (err) {
        console.error("Error fetching cause:", err);
      }
    };

    fetchCause();
  }, [id]);

  const nextImage = () => {
    if (!cause?.images || cause.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % cause.images.length);
  };

  const prevImage = () => {
    if (!cause?.images || cause.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + cause.images.length) % cause.images.length);
  };

  if (!cause) return <div className="p-6 text-red-600">Loading cause details...</div>;

  const progress = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));
  const images = cause.images && cause.images.length > 0 ? cause.images : [cause.imageUrl];

  return (
    <div className="min-w-[100vw] bg-stone-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/causes")}
          className="mb-6 flex items-center gap-2 text-stone-700 hover:text-stone-900"
        >
          <FaArrowLeft /> Back to Causes
        </button>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded shadow">
          <div className="relative w-full h-64 md:h-[400px] overflow-hidden rounded">
            <img
              src={images[currentImageIndex]}
              alt={cause.title}
              className="w-full h-full object-cover rounded"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-stone-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full"
                >
                  ❮
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-stone-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{cause.title}</h2>
            <p className="text-stone-700 mb-4">{cause.description}</p>
            <p className="text-sm mb-2"><strong>Location:</strong> {cause.location || "N/A"}</p>
            <p className="text-sm mb-2">
              <strong>Raised:</strong> ₦{cause.raisedAmount.toLocaleString()} / ₦{cause.goalAmount.toLocaleString()}
            </p>
            <div className="w-full bg-stone-200 h-2 rounded mb-4">
              <div
                className="bg-stone-800 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button
              onClick={() => navigate(`/donate/${cause._id}`)}
              className="mt-4 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded text-sm font-semibold"
            >
              <FaDonate /> Donate Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CauseDetailPage;
