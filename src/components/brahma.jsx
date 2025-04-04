import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WhyBrahmacharya = () => {
  const navigate = useNavigate(); // Create navigate instance

  const handleSubmit = () => {
    navigate("/21days"); // Replace with your actual route path
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#C0A080] text-[#4A2E1E] font-sans py-10 px-6">
      <div className="max-w-5xl mx-auto bg-[#FFF8E7] rounded-xl shadow-2xl p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#6B4423] mb-6">
          Transform Your Life in 21 Days with Brahmacharya
        </h1>
        <p className="text-lg text-center text-[#7A5A44] mb-10">
          Brahmacharya is not just about celibacy—it's about mastery over your desires and energy.
          Practice it for 21 days and see the change unfold within you.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#6B4423] mb-4 text-center">
            ✨ Why You Should Practice Brahmacharya
          </h2>
          <ul className="space-y-4 text-lg text-gray-800 list-disc list-inside">
            <li><strong>Clarity of Mind:</strong> Reduce mental fog and sharpen your focus.</li>
            <li><strong>Self-Confidence:</strong> Mastery over desires leads to inner strength.</li>
            <li><strong>Emotional Balance:</strong> Stay calm, composed, and centered.</li>
            <li><strong>Better Energy:</strong> No more energy leaks—feel more vibrant and alive.</li>
            <li><strong>Purpose Driven Life:</strong> You'll align your actions with your higher purpose.</li>
          </ul>
        </section>

        <section className="bg-[#FAE3C6] p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-bold text-[#6B4423] mb-4 text-center">📅 What Happens in 21 Days?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold text-[#A0522D]">Days 1-7</h3>
              <p className="mt-2">Initial cravings surface. You learn to say "No" and reclaim control.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold text-[#A0522D]">Days 8-14</h3>
              <p className="mt-2">Energy builds up. You start noticing more clarity, motivation, and peace.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold text-[#A0522D]">Days 15-21</h3>
              <p className="mt-2">Transformation begins. You feel empowered, calm, and inspired to live purposefully.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#6B4423] mb-4">🔥 Commit to the 21-Day Challenge</h2>
          <p className="mb-6 text-lg">This is your chance to break old habits and evolve into a stronger version of yourself. You have nothing to lose—only greatness to gain.</p>
          <button
            className="bg-[#C0A080] hover:bg-[#6B4423] text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg text-lg"
            onClick={handleSubmit}
          >
            Start the 21-Day Journey
          </button>
        </section>

        <div className="mt-12 text-center italic text-[#7A5A44]">
          "Mastery over the self is the path to mastery over life."
        </div>
      </div>
    </div>
  );
};

export default WhyBrahmacharya;