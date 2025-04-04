import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, set } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import { firstTenDaysTasksSet } from "../constants/index";

const XP_PER_TASK = 10;
const LEVEL_UP_XP = 100;

const Transformation = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const [ageGroup, setAgeGroup] = useState("18_to_25");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch analysis data from Firestore and gamification data from Realtime Database
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        // Get analysis data from Firestore
        const firestore = getFirestore();
        const analysisDocRef = doc(firestore, "analysisResults", user.uid);
        const analysisSnap = await getDoc(analysisDocRef);
        if (!analysisSnap.exists()) {
          console.error("No analysis data found for user in Firestore:", user.uid);
          setLoading(false);
          return;
        }
        const analysis = analysisSnap.data();
        console.log("✅ Fetched analysis from Firestore:", analysis);
        setAnalysisData(analysis);

        // Set age group based on analysis data
        if (!analysis.age_group) {
          console.error("Analysis data missing age_group field");
          setLoading(false);
          return;
        }
        setAgeGroup(analysis.age_group);

        if (!analysis.sectionsAnalysis || !Array.isArray(analysis.sectionsAnalysis)) {
          console.error("Analysis sections missing or invalid:", analysis);
          setLoading(false);
          return;
        }

        // Fetch gamification progress from Realtime Database
        const db = getDatabase();
        const xpRef = ref(db, `users/${user.uid}/gamification`);
        const gamificationSnap = await get(xpRef);
        if (gamificationSnap.exists()) {
          const { xp, level, streak } = gamificationSnap.val();
          setXp(xp || 0);
          setLevel(level || 1);
          setStreak(streak || 0);
        }

        // Generate tasks based on analysis data and local task set
        generateDailyTasks(analysis.age_group, analysis.sectionsAnalysis);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate tasks by matching analysis sections with the local tasks data
  const generateDailyTasks = (ageGroup, sections) => {
    const today = new Date().getDate();
    const dayIndex = (today - 1) % 2;
    console.log("Age Group from Analysis:", ageGroup);
    console.log("Sections from Analysis:", sections);

    const tasksData = firstTenDaysTasksSet[ageGroup];
    if (!tasksData) {
      console.error(`No tasks data found for age group: ${ageGroup}`);
      return;
    }
    console.log("Tasks Data for Age Group:", tasksData);

    // Get any previously completed tasks from localStorage
    const completed = JSON.parse(localStorage.getItem(`completedTasks-${today}`) || "[]");
    const tasks = [];

    sections.forEach((section) => {
      const sectionName = section.sectionName;
      // Use case-insensitive matching for keys
      const matchedKey = Object.keys(tasksData).find(
        (key) => key.toLowerCase() === sectionName.toLowerCase()
      );
      if (matchedKey) {
        const sectionTasksForDay = tasksData[matchedKey][dayIndex];
        if (Array.isArray(sectionTasksForDay) && sectionTasksForDay.length > 0) {
          tasks.push(...sectionTasksForDay);
        } else {
          console.warn(`No tasks found for section "${sectionName}" on day index ${dayIndex}`);
        }
      } else {
        console.warn(`No matching tasks key found for section "${sectionName}"`);
      }
    });

    if (tasks.length === 0) {
      console.warn("No tasks generated for today.");
    }

    setDailyTasks(tasks);
    setCompletedTasks(completed);
  };

  // Toggle task completion status, update XP/Level, and save changes to Realtime Database & localStorage
  const handleTaskToggle = async (task) => {
    const today = new Date().getDate();
    const isCompleted = completedTasks.includes(task);
    const updatedCompleted = isCompleted
      ? completedTasks.filter((t) => t !== task)
      : [...completedTasks, task];

    setCompletedTasks(updatedCompleted);
    localStorage.setItem(`completedTasks-${today}`, JSON.stringify(updatedCompleted));

    // Update XP: add if completing, subtract if uncompleting
    const updatedXP = isCompleted ? xp - XP_PER_TASK : xp + XP_PER_TASK;
    const newLevel = Math.floor(updatedXP / LEVEL_UP_XP) + 1;
    setXp(updatedXP);
    setLevel(newLevel);

    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      await set(ref(db, `users/${user.uid}/gamification`), {
        xp: updatedXP,
        level: newLevel,
        streak, // You can implement streak update logic later
      });
    }
  };

  const progressPercent = dailyTasks.length
    ? Math.round((completedTasks.length / dailyTasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col h-[90vh]">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          🎯 Personalized Daily Tasks
        </h2>

        <div className="mb-4 text-sm text-gray-700 flex justify-between">
          <p>
            <strong>Level:</strong> {level}
          </p>
          <p>
            <strong>XP:</strong> {xp} / {LEVEL_UP_XP}
          </p>
          <p>
            <strong>Streak:</strong> {streak} 🔥
          </p>
        </div>

        <div className="w-full h-3 bg-gray-300 rounded-full mb-6 overflow-hidden shadow-inner">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading your tasks...</p>
        ) : dailyTasks.length === 0 ? (
          <p className="text-center text-red-400">
            No tasks found for today. Please check your analysis data or task set.
          </p>
        ) : (
          <ul className="overflow-y-auto flex-1 space-y-3 pr-1">
            {dailyTasks.map((task, idx) => (
              <li
                key={idx}
                className={`cursor-pointer p-4 rounded-lg border transition duration-300 ${
                  completedTasks.includes(task)
                    ? "bg-green-100 line-through border-green-300 text-gray-600"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
                onClick={() => handleTaskToggle(task)}
              >
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transformation;