import { useState, useEffect } from "react";
import { firstTenDaysTasksSet } from "../constants/index"; // Import task JSON

const Transformation = () => {
    const [dailyTasks, setDailyTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [userInput, setUserInput] = useState({});
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchTasks();
        loadProgress();
    }, []);

    const fetchTasks = () => {
        setLoading(true);
        const today = new Date().getDate();
        
        // Use a fallback default value to ensure valid JSON is parsed
        const storedCompletedTasks = JSON.parse(localStorage.getItem(`completedTasks-${today}`) || "[]");
        const storedUncompletedTasks = JSON.parse(localStorage.getItem(`uncompletedTasks-${today}`) || "[]");

        // Load today's tasks from JSON
        const taskSet = firstTenDaysTasksSet.task?.[0]?.tasks || []; 
        const taskData = taskSet.find(t => t.day === (today % 10 || 10)); 
        let todayTasks = taskData ? taskData.tasks : [];

        // Merge uncompleted tasks from yesterday
        if (storedUncompletedTasks.length > 0) {
            todayTasks = [...storedUncompletedTasks, ...todayTasks];
        }

        setDailyTasks(todayTasks);
        setCompletedTasks(storedCompletedTasks);
        updateProgress(storedCompletedTasks.length, todayTasks.length);
        setLoading(false);
    };

    const updateProgress = (completed, total) => {
        setProgress(total > 0 ? (completed / total) * 100 : 100);
    };

    const completeTask = (index) => {
        setDailyTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            const completedTask = updatedTasks.splice(index, 1)[0];

            setCompletedTasks((prev) => {
                const newCompleted = [...prev, completedTask];
                localStorage.setItem(`completedTasks-${new Date().getDate()}`, JSON.stringify(newCompleted));

                // Update XP and Level
                let newXp = xp + 10; // +10 XP per task
                let newLevel = level;
                if (newXp >= 100) { 
                    newLevel += 1;
                    newXp = 0; // Reset XP after leveling up
                }
                setXp(newXp);
                setLevel(newLevel);
                saveProgress(newLevel, newXp);

                updateProgress(newCompleted.length, updatedTasks.length + newCompleted.length);
                return newCompleted;
            });

            setUserInput((prev) => {
                const updated = { ...prev };
                delete updated[index];
                return updated;
            });

            return updatedTasks;
        });
    };

    const saveProgress = (level, xp) => {
        localStorage.setItem("userLevel", level);
        localStorage.setItem("userXp", xp);
    };

    const loadProgress = () => {
        const storedLevel = localStorage.getItem("userLevel") || 1;
        const storedXp = localStorage.getItem("userXp") || 0;
        setLevel(parseInt(storedLevel));
        setXp(parseInt(storedXp));
    };

    const handleEndOfDay = () => {
        const today = new Date().getDate();
        localStorage.setItem(`uncompletedTasks-${today + 1}`, JSON.stringify(dailyTasks));
        localStorage.removeItem(`completedTasks-${today}`);
        setDailyTasks([]);
        setCompletedTasks([]);
        setProgress(0);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Today's Tasks</h2>

            {/* Level & XP */}
            <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 rounded-lg shadow">
                <span className="text-gray-700 text-sm font-medium">Level: {level}</span>
                <span className="text-gray-700 text-sm font-medium">XP: {xp}/100</span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-6">
                <div 
                    className="absolute top-0 left-0 bg-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Task List */}
            {loading ? (
                <p className="text-center text-gray-500 text-sm mt-4">Loading tasks...</p>
            ) : dailyTasks.length > 0 ? (
                <div className="space-y-4">
                    {dailyTasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-300">
                            <span className="text-gray-800 text-sm font-medium">{task}</span>
                            <input 
                                type="text" 
                                placeholder="Describe completion" 
                                value={userInput[index] || ""} 
                                onChange={(e) => setUserInput({ ...userInput, [index]: e.target.value })} 
                                className="border border-gray-300 px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            />
                            <button 
                                className="ml-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
                                onClick={() => completeTask(index)}
                            >
                                ✔
                            </button>
                        </div>
                    ))}
                </div>
            ) : progress === 100 && completedTasks.length > 0 ? (
                <p className="text-center text-gray-500 text-sm mt-4">All tasks completed! 🎉</p>
            ) : (
                <p className="text-center text-gray-500 text-sm mt-4">No tasks left for today.</p>
            )}

            {/* End of Day Button */}
            {dailyTasks.length > 0 && (
                <button 
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                    onClick={handleEndOfDay}
                >
                    End Day & Save Progress
                </button>
            )}
        </div>
    );
};

export default Transformation;
