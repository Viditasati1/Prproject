"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const QuizComponent = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    
    if (currentQuestion === questions.length - 1) {
      onComplete(answers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg mx-auto"
      key={currentQuestion}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#4A90E2] mb-6">
        Question {currentQuestion + 1}/{questions.length}
      </h2>
      
      <p className="text-lg text-gray-700 mb-4">{questions[currentQuestion].question}</p>
      
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            className="w-full bg-[#4A90E2] text-white px-4 py-3 rounded-lg hover:bg-[#357ABD] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizComponent;
