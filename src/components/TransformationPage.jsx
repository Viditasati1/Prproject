import React, { useRef, useState } from "react";

const TransformationPage = ({ goToTasks }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const replayAudio = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Enlarged Full-Width Image */}
            <img 
                src="/wisdom-img.jpg" 
                alt="Wise Words" 
                className="w-full h-[600px] md:h-[700px] object-contain rounded-lg shadow-lg mb-6"
            />

            {/* Audio Controls */}
            <audio ref={audioRef} src="/wisdom-audio.mp3" />

            {/* Buttons */}
            <div className="flex space-x-4">
                <button 
                    onClick={togglePlayPause} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>

                <button 
                    onClick={replayAudio} 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    Replay
                </button>

                <button 
                    onClick={goToTasks} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
                >
                    Go to Daily Tasks Plan
                </button>
            </div>
        </div>
    );
};

export default TransformationPage;
