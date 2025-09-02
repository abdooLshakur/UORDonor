// ✅ Removed ToastContainer, toast import
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const DonateFormPage = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const { id } = useParams();
  const [cause, setCause] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", amount: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setFormData((prev) => ({
          ...prev,
          name: user.fullName || "",
          email: user.email || "",
        }));
      } catch (err) {
        console.error("Error parsing user cookie:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const text = `New Donation\nName: ${formData.name}\nEmail: ${formData.email}\nAmount: ₦${formData.amount}\nnote: ${formData.note}\nCause: ${cause?.title}`;
    return `https://wa.me/2347078561641?text=${encodeURIComponent(text)}`;
  };

  const handleIveSent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/donations/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          causeId: id,
          donorName: formData.name,
          email: formData.email,
          amount: formData.amount,
          note: formData.note,
        }),
      });

      if (!res.ok) throw new Error("Failed to record donation");
      setMessage("Donation recorded. Awaiting admin verification.");
      console.log("Donation recorded successfully.");
    } catch (err) {
      console.error("Donation error:", err);
      setMessage("Donation failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!cause) return <div className="p-6 text-red-600">Cause not found.</div>;

  return (
    <div className="w-[99vw] min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-md p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">Donate to {cause.title}</h2>
        <img src={cause.images && cause.images.length > 0 ? cause.images[0] : "/placeholder.jpg"} alt={cause.title} className="w-full h-56 object-cover rounded mb-6" />
        <p className="text-stone-600 mb-6 text-center">{cause.description}</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-stone-300 px-4 py-2 rounded focus:ring-2 focus:ring-stone-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-stone-300 px-4 py-2 rounded focus:ring-2 focus:ring-stone-500"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount Donated (₦)"
              value={formData.amount}
              onChange={handleChange}
              required
              className="border border-stone-300 px-4 py-2 rounded focus:ring-2 focus:ring-stone-500"
            />
            <input
              type="text"
              name="note"
              placeholder="Request"
              value={formData.note}
              onChange={handleChange}
              className="border border-stone-300 px-4 py-2 rounded focus:ring-2 focus:ring-stone-500"
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full mt-4 bg-stone-800 hover:bg-stone-900 text-white py-2 rounded font-semibold"
              >
                Donate Now
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 animate-slide-up">
            <h3 className="text-lg font-semibold text-stone-700 mb-3 text-center">Transfer Details</h3>
            <div className="bg-stone-50 border border-stone-300 p-4 rounded mb-6 text-center">
              <p className="text-sm">Account Name: UUMMA OF RASULULLAH CHARITY FOUDATION</p>
              <p className="text-sm">Account Number: 1100896243</p>
              <p className="text-sm">Bank: 9 SERVICE BANK</p>
            </div>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded font-semibold mb-4"
            >
              Send to WhatsApp
            </a>
            <button
              onClick={handleIveSent}
              disabled={loading}
              className="w-full bg-stone-800 hover:bg-stone-900 text-white py-2 rounded font-semibold"
            >
              {loading ? "Processing..." : "I've Sent"}
            </button>
            {message && (
              <p className="mt-4 text-center text-stone-700">{message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateFormPage;
