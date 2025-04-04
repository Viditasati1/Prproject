import { SectionWrapper } from "./hoc";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const ctaItems = [
    {
      name: "Take the Assessment",
      description: "Discover your anxiety level with our assessment tool.",
      action: "#assessment",
    },
    {
      name: "Join Role-Playing",
      description: "Practice social interactions and gain confidence.",
      action: "#roleplay",
    },
    {
      name: "Explore Therapy Modules",
      description: "Access curated exercises to overcome social anxiety.",
      action: "#therapy",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center gap-10 py-16 bg-[#8B5E3C]">
      {/* Section Header */}
      <h2 className="text-white text-4xl font-bold">
        Ready to Take the Next Step?
      </h2>
      <p className="text-white text-lg max-w-3xl">
        Empower yourself with our tools and resources to overcome social anxiety. 
        Take action now and break the barriers!
      </p>

      {/* Call to Action Button */}
      <div className="mt-8">
        <Link
          to="/Signup"
          className="bg-[#D2B48C] text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#A67B5B] transition-colors duration-300"
        >
          Start My Journey
        </Link>
      </div>

      {/* Supporting Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 mt-12">
        {ctaItems.map((item) => (
          <div
            key={item.name}
            className="bg-[#D2B48C] shadow-md rounded-lg p-5 w-72 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-white text-xl font-bold">{item.name}</h3>
            <p className="text-white text-sm mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Inspiration Quote */}
      <div className="mt-16 max-w-2xl text-center">
        <p className="text-white text-lg italic">
          "The journey of a thousand miles begins with a single step. Start yours today!"
        </p>
      </div>
    </div>
  );
};

export default SectionWrapper(CallToAction, "");