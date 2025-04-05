import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { questionset } from "../constants/index";

const getCategoryAndMessage = (percentageScore) => {
  if (percentageScore >= 80) {
    return {
      category: "Good ✅",
      message: "You're doing great in this section! Keep up the good work. 💪",
      color: "green-600"
    };
  } else if (percentageScore >= 50) {
    return {
      category: "Moderate Concerns ⚠️",
      message: "You have some struggles in this area. Consider working on improvements. 🔍",
      color: "yellow-500"
    };
  }
  return {
    category: "Significant Concern ❌",
    message: "This section shows a high level of concern. Seeking help or support might be beneficial. 💙",
    color: "red-500"
  };
};

const SectionResult = ({ section }) => (
  <div className="border-l-4 p-3 my-3 rounded-lg shadow-sm bg-gray-50">
    <h3 className="text-xl font-semibold text-gray-700">
      {section.sectionName}
    </h3>
    <p>
      <strong>Score:</strong> {section.totalScore} (
      {section.percentageScore.toFixed(1)}%)
    </p>
    <p className={`text-lg font-semibold text-${section.color}`}>
      <strong>Category:</strong> {section.category}
    </p>
    <p className="text-sm text-gray-600">{section.message}</p>
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
      <div
        className={`h-4 rounded-full bg-${section.color.replace('text-', '')}`}
        style={{ width: `${section.percentageScore}%` }}
      ></div>
    </div>
  </div>
);

const Analysis = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const processQuizData = (responses, age_group) => {
    const questionnaire = questionset.questionnaires.find(q => q.age_group === age_group);
    if (!questionnaire) {
      setError("No questionnaire found for your age group.");
      return null;
    }

    // First, validate responses
    if (!responses || !Array.isArray(responses)) {
      setError("Invalid response data format.");
      return null;
    }

    const { sections } = questionnaire;
    const result = {
      sectionsAnalysis: [],
      overallTotal: 0,
      minPossibleTotal: 0,
      maxPossibleTotal: 0
    };

    let responseIndex = 0;
    
    sections.forEach(section => {
      const numQuestions = section.questions.length;
      const sectionResponses = responses.slice(responseIndex, responseIndex + numQuestions);
      responseIndex += numQuestions;

      // Convert null responses to 0 (neutral answer)
      const cleanedResponses = sectionResponses.map(r => r === null ? 0 : r);
      
      const sectionTotal = cleanedResponses.reduce((sum, val) => sum + val, 0);
      const minPossible = numQuestions * 1;
      const maxPossible = numQuestions * 4;

      result.overallTotal += sectionTotal;
      result.minPossibleTotal += minPossible;
      result.maxPossibleTotal += maxPossible;

      const percentageScore = Math.max(0, Math.min(100, 
        ((sectionTotal - minPossible) / (maxPossible - minPossible)) * 100
      ));

      const { category, message, color } = getCategoryAndMessage(percentageScore);

      result.sectionsAnalysis.push({
        sectionName: section.name,
        totalScore: sectionTotal,
        percentageScore,
        category,
        message,
        color
      });
    });

    const overallPercentage = ((result.overallTotal - result.minPossibleTotal) / 
      (result.maxPossibleTotal - result.minPossibleTotal)) * 100;
    
    const { message: overallMessage } = getCategoryAndMessage(overallPercentage);

    return {
      age_group,
      overallTotal: result.overallTotal,
      overallPercentage,
      overallMessage,
      sectionsAnalysis: result.sectionsAnalysis
    };
  };

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

      const data = docSnap.data();
      if (!data || !data.age_group || !data.responses) {
        setError("Incomplete quiz data. Please retake the quiz.");
        return;
      }

      // Ensure responses is an array and has proper length
      const questionnaire = questionset.questionnaires.find(q => q.age_group === data.age_group);
      if (!questionnaire) {
        setError("No questionnaire found for your age group.");
        return;
      }

      const expectedLength = questionnaire.sections.reduce((sum, section) => sum + section.questions.length, 0);
      if (!Array.isArray(data.responses) || data.responses.length !== expectedLength) {
        setError("Invalid response data. Please retake the quiz.");
        return;
      }

      const processedData = processQuizData(data.responses, data.age_group);
      if (processedData) {
        setAnalysisData(processedData);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Firestore fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        fetchQuizResponses(user.uid);
      } else {
        setError("User not logged in.");
        setLoading(false);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const sectionChartData = useMemo(() => 
    analysisData?.sectionsAnalysis.map((section) => ({
      name: section.sectionName,
      score: section.percentageScore,
    })) || []
  , [analysisData]);

  if (error) {
    return <div className="text-red-500 font-semibold text-center p-4">{error}</div>;
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Mental Health Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">
              <strong>Age Group:</strong> {analysisData.age_group || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Total Score:</strong> {analysisData.overallTotal || 0}
            </p>
            <p className={`text-lg font-semibold text-${getCategoryAndMessage(analysisData.overallPercentage).color}`}>
              <strong>Overall Assessment:</strong> {analysisData.overallMessage}
            </p>
          </div>

          {analysisData.sectionsAnalysis.map((section, idx) => (
            <SectionResult key={idx} section={section} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full h-64 bg-gray-100 p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" name="Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={() => navigate("/transformation-resources")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Let's Transform Your Life
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Analysis);
