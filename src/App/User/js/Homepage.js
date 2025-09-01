import React, { useState, useEffect } from "react";
import { FaHandsHelping, FaCheckCircle, FaWhatsapp, FaUserShield } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import banner1 from "../images/one.jpg";
import banner2 from "../images/two.jpg";
import banner3 from "../images/three.jpg";
import lightimg from "../images/ben-white-oSg7-6B10zo-unsplash.jpg";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    image: banner1,
    title: "Give Hope. Change Lives.",
    text: "Your support can feed a child, clothe the needy, and uplift a family today.",
  },
  {
    image: banner2,
    title: "Donate with Purpose",
    text: "Help us deliver clean water, education, and medical support to underserved communities.",
  },
  {
    image: banner3,
    title: "Together, We Make a Difference",
    text: "Join our mission to restore dignity and bring smiles to those in need.",
  },
];

const HomePage = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [causes, setCauses] = useState([]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await fetch(`${api}/api/causes`);
        if (!res.ok) throw new Error("Failed to fetch causes");
        const data = await res.json();
        setCauses(data);
      } catch (err) {
        console.error("Error fetching causes:", err);
      }
    };

    fetchCauses();
  }, []);

  return (
    <div className="w-[99vw] bg-stone-50 text-stone-800 overflow-x-hidden">
      <Navbar />
      {/* Hero Carousel */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  {slide.text}
                </p>
                <Link
                  to={"/causes"}
                  className="inline-block bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded font-medium"
                >
                  Explore Causes
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Prev / Next Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
          <button
            onClick={prevSlide}
            className="bg-stone-800 bg-opacity-60 hover:bg-opacity-90 text-white px-3 py-2 rounded-full"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="bg-stone-800 bg-opacity-60 hover:bg-opacity-90 text-white px-3 py-2 rounded-full"
          >
            ❯
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-stone-900 leading-snug">
            Be the Light in Someone’s Darkness
          </h2>
          <p className="text-lg mb-6">
            Umma of Rasulullah Charity Foundation exists to help the poor, orphans,
            widows and those in urgent need. Every donation helps feed the hungry,
            support education, and restore dignity. You can make a lasting impact — one life at a time.
          </p>
          <a
            href="/aboutus"
            className="inline-block bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-900 transition"
          >
            Learn More About Us
          </a>
        </div>
        <div>
          <img
            src={lightimg}
            alt="Helping hands"
            className="rounded shadow-lg w-full"
          />
        </div>
      </section>

      {/* Featured Causes (API) */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-stone-900">Featured Causes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {causes.slice(0, 3).map((cause) => (
              <div key={cause._id} className="bg-stone-100 rounded shadow p-4">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="rounded mb-4 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">{cause.title}</h3>
                <p className="text-sm mb-2">Raised: ₦{cause.raised || 0} / Goal: ₦{cause.goal || 0}</p>
                <div className="w-full bg-stone-300 h-2 rounded mb-4">
                  <div
                    className="bg-stone-800 h-2 rounded"
                    style={{ width: `${(cause.raised / cause.goal) * 100 || 0}%` }}
                  ></div>
                </div>
                <a
                  href={`/donate/${cause._id}`}
                  className="block text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-900"
                >
                  Donate Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-stone-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <FaHandsHelping size={40} className="mx-auto text-stone-800 mb-3" />
              <h4 className="font-semibold text-lg">Choose a Cause</h4>
              <p className="text-sm">Pick from the list of active charity causes.</p>
            </div>
            <div className="p-4">
              <FaCheckCircle size={40} className="mx-auto text-stone-800 mb-3" />
              <h4 className="font-semibold text-lg">Donate Securely</h4>
              <p className="text-sm">Fill out the donation form and send your transfer.</p>
            </div>
            <div className="p-4">
              <FaWhatsapp size={40} className="mx-auto text-green-600 mb-3" />
              <h4 className="font-semibold text-lg">Send to WhatsApp</h4>
              <p className="text-sm">Share your reference for fast verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Call To Action */}
      <section className="py-16 bg-stone-100 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <FaUserShield size={40} className="mx-auto text-stone-800 mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Track Your Impact?
          </h2>
          <p className="text-stone-700 mb-6">
            Create a free donor account to monitor your donations, receive updates, and get access to your dashboard.
            Easily manage and verify your support with full transparency.
          </p>
          <a
            href="/signup"
            className="inline-block bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-900"
          >
            Sign Up Today
          </a>
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="bg-stone-200 py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-stone-900">
            Join Our WhatsApp Community
          </h2>
          <p className="mb-6 text-stone-700">
            Stay updated, engage with other supporters, and be the first to know when help is needed.
          </p>
          <a
            href="https://chat.whatsapp.com/E1T1LqGwk2cByn6s4wel7s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
          >
            <FaWhatsapp size={20} /> Join Now
          </a>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 bg-white text-center">
        <blockquote className="italic text-xl text-stone-700 max-w-3xl mx-auto">
          “Even the smallest act of kindness is worth more than the grandest intention.”
        </blockquote>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
