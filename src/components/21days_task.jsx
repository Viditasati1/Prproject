import React, { useState, useEffect } from "react";


const brahmacharyaTasks = [
    {
      day: 1,
      tasks: [
        "Wake up by 5:30 AM",
        "Meditate for 10 minutes",
        "Follow a sattvic diet (no onion, garlic, junk)",
        "Light exercise for 15 minutes",
        "Read 2 verses of the Bhagavad Gita (Chapter 2)",
      ],
    },
    {
      day: 2,
      tasks: [
        "Wake up by 5:30 AM",
        "Meditate for 15 minutes",
        "Eat only fresh homemade food",
        "Do yoga/stretching for 20 minutes",
        "Read 2 verses of the Bhagavad Gita (Chapter 2)",
      ],
    },
    {
      day: 3,
      tasks: [
        "Wake up by 5:15 AM",
        "Meditate with breath awareness - 15 minutes",
        "Avoid processed foods & sugar",
        "Walk in nature or do Surya Namaskar (3 rounds)",
        "Read 2 verses of the Bhagavad Gita (Chapter 3)",
      ],
    },
    {
      day: 4,
      tasks: [
        "Wake up by 5:15 AM",
        "Meditate with mantra chanting",
        "Avoid using phone before 9 AM",
        "Do 20 mins bodyweight workout or yoga",
        "Read 2 verses of the Bhagavad Gita (Chapter 3)",
      ],
    },
    {
      day: 5,
      tasks: [
        "Wake up by 5:00 AM",
        "Meditate in silence - 20 mins",
        "Eat light before sunset",
        "Jog or cycle for 20 mins",
        "Read 2 verses of the Bhagavad Gita (Chapter 4)",
      ],
    },
    {
      day: 6,
      tasks: [
        "Wake up by 5:00 AM",
        "Gratitude journaling + meditation",
        "No outside/restaurant food",
        "Practice 15 mins Pranayama (Anulom Vilom)",
        "Read 2 verses of the Bhagavad Gita (Chapter 4)",
      ],
    },
    {
      day: 7,
      tasks: [
        "Wake up before sunrise",
        "Mindful silence for 1 hour in the morning",
        "Prepare and eat sattvic meals",
        "15 mins flexibility workout",
        "Read 2 verses of the Bhagavad Gita (Chapter 5)",
      ],
    },
    {
      day: 8,
      tasks: [
        "Wake up before 5 AM",
        "Meditate and visualize your ideal self",
        "Cook & share food with someone",
        "Try nature walk barefoot on grass",
        "Read 2 verses of the Bhagavad Gita (Chapter 5)",
      ],
    },
    {
      day: 9,
      tasks: [
        "Wake up before 5 AM",
        "10 minutes guided meditation (YouTube)",
        "Eat only fruits for dinner",
        "Light jog or jumping jacks - 20 mins",
        "Read 2 verses of the Bhagavad Gita (Chapter 6)",
      ],
    },
    {
      day: 10,
      tasks: [
        "Wake up before 4:45 AM",
        "Journal about your temptations & overcome them",
        "Prepare a sattvic dish & share the recipe",
        "Sun salutation (5 rounds)",
        "Read 2 verses of the Bhagavad Gita (Chapter 6)",
      ],
    },
    {
      day: 11,
      tasks: [
        "Wake up by 4:30 AM",
        "Chant 'Om' 108 times after bath",
        "No social media entire day",
        "Do 20 squats, 20 pushups, 2-min plank",
        "Read 2 verses of the Bhagavad Gita (Chapter 7)",
      ],
    },
    {
      day: 12,
      tasks: [
        "Wake up before 4:30 AM",
        "Meditate with devotional music",
        "Eat only twice today (No snacking)",
        "Practice balance (tree pose etc)",
        "Read 2 verses of the Bhagavad Gita (Chapter 7)",
      ],
    },
    {
      day: 13,
      tasks: [
        "Wake up before 4:30 AM",
        "Walk barefoot on sand/soil",
        "Help your parents or friends today",
        "Stretching + light cardio (20 mins)",
        "Read 2 verses of the Bhagavad Gita (Chapter 8)",
      ],
    },
    {
      day: 14,
      tasks: [
        "Wake up before 4:30 AM",
        "No phone for first 2 hours of the day",
        "Avoid salt & spices today",
        "Practice mindful breathing",
        "Read 2 verses of the Bhagavad Gita (Chapter 8)",
      ],
    },
    {
      day: 15,
      tasks: [
        "Wake up by 4:15 AM",
        "Silent walking meditation",
        "Speak only when necessary (Mauna)",
        "Yoga + Pranayama - 30 minutes",
        "Read 2 verses of the Bhagavad Gita (Chapter 9)",
      ],
    },
    {
      day: 16,
      tasks: [
        "Wake up by 4:15 AM",
        "Journal about your habits & urges",
        "Cook something new & sattvic",
        "15 mins strength training",
        "Read 2 verses of the Bhagavad Gita (Chapter 9)",
      ],
    },
    {
      day: 17,
      tasks: [
        "Wake up before 4:15 AM",
        "Meditate on your purpose in life",
        "No sugar today",
        "Take a cold shower",
        "Read 2 verses of the Bhagavad Gita (Chapter 10)",
      ],
    },
    {
      day: 18,
      tasks: [
        "Wake up before 4 AM",
        "Spend 15 minutes in prayer",
        "Do not lie or gossip today",
        "Go for a nature walk and sit silently for 15 mins",
        "Read 2 verses of the Bhagavad Gita (Chapter 10)",
      ],
    },
    {
      day: 19,
      tasks: [
        "Wake up by 4 AM",
        "Recite Hanuman Chalisa or a mantra you love",
        "Complete your tasks without distractions",
        "Full-body workout or yoga for 30 mins",
        "Read 2 verses of the Bhagavad Gita (Chapter 11)",
      ],
    },
    {
      day: 20,
      tasks: [
        "Wake up by 4 AM",
        "Reflect on what you’ve gained in 19 days",
        "Eat only fruits and sattvic khichdi",
        "Do breathing exercises for 20 minutes",
        "Read 2 verses of the Bhagavad Gita (Chapter 11)",
      ],
    },
    {
      day: 21,
      tasks: [
        "Wake up by 4 AM",
        "1 hour of deep meditation",
        "Write a letter to your future self",
        "Practice gratitude for the 21-day journey",
        "Read 2 verses of the Bhagavad Gita (Chapter 12)",
      ],
    },
  ];
  
const BrahmacharyaChallenge = () => {
  const [dayIndex, setDayIndex] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [streak, setStreak] = useState(1);

  const currentDay = brahmacharyaTasks[dayIndex];

  useEffect(() => {
    const storedStreak = localStorage.getItem("streak");
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("streak", streak.toString());
  }, [streak]);

  const handleCheckboxChange = (index) => {
    const newChecked = [...checkedTasks];
    newChecked[index] = !newChecked[index];
    setCheckedTasks(newChecked);
  };

  const handleNextDay = () => {
    if (dayIndex < brahmacharyaTasks.length - 1) {
      setDayIndex(dayIndex + 1);
      setCheckedTasks([]);
      setStreak(streak + 1);
    }
  };

  const progress =
    currentDay.tasks.length > 0
      ? (checkedTasks.filter(Boolean).length / currentDay.tasks.length) * 100
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-yellow-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-center text-yellow-800 mb-2">🕉️ Brahmacharya 21-Day Challenge</h1>
      <p className="text-center text-yellow-700 mb-6 italic">Day {dayIndex + 1} of 21 · 🔥 Streak: {streak} days</p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-yellow-400">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-4">{currentDay.title}</h2>
        <ul className="space-y-3">
          {currentDay.tasks.map((task, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={checkedTasks[index] || false}
                onChange={() => handleCheckboxChange(index)}
                className="mr-3 h-5 w-5 text-yellow-600"
              />
              <span className={checkedTasks[index] ? "line-through text-gray-500" : "text-gray-800"}>
                {task.includes("Read 2 verses") ? (
                  <>
                    {task}{" "}
                    <a
                      href="https://bhagavadgita.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline text-blue-600 hover:text-blue-800"
                    >
                      Read Now 📖
                    </a>
                  </>
                ) : (
                  task
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-right text-yellow-700 mt-1">{Math.round(progress)}% completed</p>
        </div>
      </div>

      {dayIndex < brahmacharyaTasks.length - 1 ? (
        <button
          onClick={handleNextDay}
          className="block w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition"
        >
          ✅ I’m Done — Next Day
        </button>
      ) : (
        <p className="text-center text-green-700 font-semibold">🎉 You’ve completed all 21 days! Keep rising!</p>
      )}
    </div>
  );
};

export default BrahmacharyaChallenge;