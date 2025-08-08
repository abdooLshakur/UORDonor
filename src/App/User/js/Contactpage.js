import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from './Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const api = "https://uor.onrender.com";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    setLoading(true);
    try {
      const res = await fetch(`${api}/api/users/contactus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      form.reset();
      toast.success(result.message || "Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />

      <div className="bg-stone-100 py-10 text-center">
        <h1 className="text-4xl font-bold text-stone-900">Contact Us</h1>
      </div>

      <section className="flex flex-col md:flex-row gap-10 px-4 md:px-16 py-10 bg-white">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-stone-800">Get In Touch With Us</h2>
          <p className="text-stone-600 mb-6">
            If you have questions, want to collaborate, or simply wish to say hello — we’d love to hear from you. We are open to volunteers, donors, and kind-hearted people like you!
          </p>

          <div className="space-y-2 text-stone-700">
            <p><strong>📞 Phone:</strong> +234 915 551 1890</p>
            <p><strong>✉️ Email:</strong> uorcharityfoundation@gmail.com</p>
            <p><strong>📍 Address:</strong> Remote / Online-based</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-stone-600 text-xl">
            <a href="https://wa.me/2347078561641" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-600">
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-black">
              <FaTiktok />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-600">
              <FaYoutube />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-700">
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="md:w-1/2 bg-stone-100 p-6 rounded-lg shadow">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              rows="5"
              required
              className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto bg-stone-800 hover:bg-stone-900 text-white font-semibold px-6 py-2 rounded ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Contact Us"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
