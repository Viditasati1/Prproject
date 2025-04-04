import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { questionset } from "../constants/index";

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
        const { age_group, responses } = submission;

        if (!responses) {
          setError("Incomplete quiz data. Please retake the quiz.");
          return;
        }

        // Retrieve the corresponding questionnaire from the questionset
        const questionnaire = questionset.questionnaires.find(
          (q) => q.age_group === age_group
        );
        if (!questionnaire) {
          setError("No questionnaire found for your age group.");
          return;
        }

        // Use the structured sections from the questionnaire
        const sections = questionnaire.sections;

        const sectionsAnalysis = [];
        let responseIndex = 0;
        let overallTotal = 0;
        let maxPossibleTotal = 0;
        let minPossibleTotal = 0;

        sections.forEach((section) => {
          const numQuestions = section.questions.length;
          // Extract the responses for this section from the flat responses array
          const sectionResponses = responses.slice(
            responseIndex,
            responseIndex + numQuestions
          );
          responseIndex += numQuestions;

          const sectionTotal = sectionResponses.reduce((sum, val) => sum + val, 0);
          const minPossible = numQuestions * 1;
          const maxPossible = numQuestions * 4;

          overallTotal += sectionTotal;
          minPossibleTotal += minPossible;
          maxPossibleTotal += maxPossible;

          const percentageScore =
            ((sectionTotal - minPossible) / (maxPossible - minPossible)) * 100;
          const percentageScoreClamped = Math.max(0, Math.min(100, percentageScore));

          let category = "";
          let message = "";

          if (percentageScoreClamped >= 80) {
            category = "Good ✅";
            message = "You're doing great in this section! Keep up the good work. 💪";
          } else if (percentageScoreClamped >= 50) {
            category = "Moderate Concerns ⚠️";
            message = "You have some struggles in this area. Consider working on improvements. 🔍";
          } else {
            category = "Significant Concern ❌";
            message = "This section shows a high level of concern. Seeking help or support might be beneficial. 💙";
          }

          sectionsAnalysis.push({
            sectionName: section.name,
            totalScore: sectionTotal,
            percentageScore: percentageScoreClamped,
            category,
            message,
          });
        });

        const overallPercentage =
          ((overallTotal - minPossibleTotal) / (maxPossibleTotal - minPossibleTotal)) *
          100;
        let overallMessage = "";

        if (overallPercentage >= 80) {
          overallMessage =
            "Your mental health is in a **good state**! Keep maintaining positive habits. 😊";
        } else if (overallPercentage >= 50) {
          overallMessage =
            "You have **moderate concerns**. Some areas may need attention. Consider healthy routines. 🏋️";
        } else {
          overallMessage =
            "You are experiencing **significant concerns**. It’s important to seek support. 💙";
        }

        setAnalysisData({
          age_group,
          overallTotal,
          overallPercentage,
          overallMessage,
          sectionsAnalysis,
        });
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Firestore fetch error:", err);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchQuizResponses(user.uid);
      } else {
        setError("User not logged in.");
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold text-center">{error}</div>;
  }
  if (!analysisData) {
    return <div className="text-center text-gray-500">Loading analysis...</div>;
  }

  const sectionChartData = analysisData.sectionsAnalysis.map((section) => ({
    name: section.sectionName,
    score: section.percentageScore,
  }));

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
              analysisData.overallPercentage >= 80
                ? "text-green-600"
                : analysisData.overallPercentage >= 50
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            <strong>Overall Assessment:</strong> {analysisData.overallMessage}
          </p>

          {analysisData.sectionsAnalysis.map((section, idx) => (
            <div
              key={idx}
              className="border-l-4 p-3 my-3 rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {section.sectionName}
              </h3>
              <p>
                <strong>Score:</strong> {section.totalScore} (
                {section.percentageScore.toFixed(1)}%)
              </p>
              <p
                className={`text-lg font-semibold ${
                  section.category === "Good ✅"
                    ? "text-green-600"
                    : section.category === "Moderate Concerns ⚠️"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                <strong>Category:</strong> {section.category}
              </p>
              <p className="text-sm text-gray-600">{section.message}</p>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className={`h-4 rounded-full ${
                    section.category === "Good ✅"
                      ? "bg-green-500"
                      : section.category === "Moderate Concerns ⚠️"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${section.percentageScore}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Charts */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <BarChart width={350} height={250} data={sectionChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </div>

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
