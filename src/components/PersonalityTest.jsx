import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionset } from "../constants/index";
import { auth, db } from "../firebase/firebaseConfig"; // Use Firestore
import { doc, setDoc } from "firebase/firestore";

const PersonalityTest = () => {
  const navigate = useNavigate();
  const userAge = localStorage.getItem("age");
  const numericAge = parseInt(userAge, 10);

  let ageGroup = "";
  if (numericAge < 18) {
    ageGroup = "under_18";
  } else if (numericAge >= 18 && numericAge <= 25) {
    ageGroup = "18_to_25";
  } else if (numericAge > 25 && numericAge <= 40) {
    ageGroup = "25_to_40";
  }

  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    const questionnaire = questionset.questionnaires.find(
      (q) => q.age_group === ageGroup
    );
    if (questionnaire) {
      const flatQuestions = [];
      questionnaire.sections.forEach((section) => {
        section.questions.forEach((question) => {
          flatQuestions.push({
            sectionName: section.name,
            text: question.text,
            options: question.options,
          });
        });
      });
      setQuizData(flatQuestions);
      setAnswers(new Array(flatQuestions.length).fill(null));
    }
  }, [ageGroup]);

  useEffect(() => {
    setAllAnswered(answers.length > 0 && answers.every((ans) => ans !== null));
  }, [answers]);

  const handleAnswerChange = (optionIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentIndex] = 4 - optionIndex;
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in. Please sign in.");
      return;
    }

    const submission = {
      age_group: ageGroup,
      responses: answers,
      timestamp: new Date(), // Store timestamp for tracking
    };

    try {
      // Store responses in Firestore under "quizResponses/{userId}"
      await setDoc(doc(db, "quizResponses", user.uid), submission);
      alert("Responses saved successfully in Firestore!");
      navigate("/analysis");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      alert("Failed to save responses. Please try again.");
    }
  };

  if (quizData.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        No questions available for your age group.
      </div>
    );
  }

  const currentQuestion = quizData[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#C0A080] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl p-8 bg-white bg-opacity-95 rounded-lg shadow-lg text-center font-sans">
        <h2 className="mb-6 text-3xl font-bold text-indigo-900">
          Personality Test
        </h2>

        <div className="p-6 mb-6 bg-gray-100 border border-gray-300 rounded-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h3 className="mb-3 text-xl text-purple-700 font-semibold">
            Section: {currentQuestion.sectionName}
          </h3>
          <p className="text-lg mb-5 text-gray-800">{currentQuestion.text}</p>

          <div className="flex flex-wrap justify-center gap-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerChange(idx)}
                className={`flex-1 max-w-xs min-w-[140px] px-5 py-3 rounded-lg border-2 text-base font-semibold transition-all duration-200 ease-in-out ${
                  answers[currentIndex] === 4 - idx
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105"
                    : "bg-sky-200 text-indigo-900 border-indigo-900 hover:bg-purple-700 hover:text-white hover:-translate-y-1"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex-1 py-3 px-5 rounded-md text-white font-bold transition-transform ${
              currentIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-900 hover:bg-purple-700 hover:-translate-y-1 active:scale-95"
            }`}
          >
            Previous
          </button>

          {currentIndex < quizData.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={answers[currentIndex] === null}
              className={`flex-1 py-3 px-5 rounded-md text-white font-bold transition-transform ${
                answers[currentIndex] === null
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-900 hover:bg-purple-700 hover:-translate-y-1 active:scale-95"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`flex-1 py-3 px-5 rounded-md text-white font-bold transition-transform ${
                !allAnswered
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-900 hover:bg-purple-700 hover:-translate-y-1 active:scale-95"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
