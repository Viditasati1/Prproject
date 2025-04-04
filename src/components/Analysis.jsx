import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "../firebase/firebaseConfig";
import { doc, getDoc } from "../firebase/firebaseConfig";
import { auth, db } from "../firebase/firebaseConfig"; // Ensure correct Firebase imports

const Analysis = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizResponses = async (userId) => {
      try {
        if (!userId) {
          setError("User not logged in.");
          return;
        }

        const docRef = doc(db, "quizResponses", userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("No quiz responses found. Please complete the quiz.");
          return;
        }

        const submission = docSnap.data();
        setAnalysisData(submission);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Firestore fetch error:", err);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchQuizResponses(user.uid);
      } else {
        setError("User not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold text-center">{error}</div>;
  }
  if (!analysisData) {
    return <div className="text-center text-gray-500">Loading analysis...</div>;
  }

  // Ensure sectionsAnalysis exists to prevent crashes
  const sectionChartData = analysisData.sectionsAnalysis
    ? analysisData.sectionsAnalysis.map((section) => ({
        name: section.sectionName || "Unknown",
        score: section.percentageScore || 0,
      }))
    : [];

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Mental Health Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Text Analysis */}
        <div>
          <p className="text-lg">
            <strong>Age Group:</strong> {analysisData.age_group || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Total Score:</strong> {analysisData.overallTotal || 0}
          </p>
          <p
            className={`text-lg font-semibold ${
              analysisData.overallTotal >= 60
                ? "text-green-600"
                : analysisData.overallTotal >= 40
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            <strong>Overall Assessment:</strong> {analysisData.overallMessage || "N/A"}
          </p>

          {analysisData.sectionsAnalysis?.map((section, idx) => (
            <div
              key={idx}
              className="border-l-4 p-3 my-3 rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {section.sectionName || "Unknown Section"}
              </h3>
              <p>
                <strong>Score:</strong> {section.totalScore || 0} (
                {section.percentageScore?.toFixed(1) || 0}%)
              </p>
              <p
                className={`text-lg font-semibold ${
                  section.category === "Good ✅"
                    ? "text-green-600"
                    : section.category === "Weak ⚠️"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                <strong>Category:</strong> {section.category || "N/A"}
              </p>
              <p className="text-sm text-gray-600">{section.message || "No message available."}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className={`h-4 rounded-full ${
                    section.category === "Good ✅"
                      ? "bg-green-500"
                      : section.category === "Weak ⚠️"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${section.percentageScore || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Charts */}
        <div className="flex flex-col items-center gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <BarChart width={350} height={250} data={sectionChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/transformation-start")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Let's Transform Your Life
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
