import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TransformationPage.css";

const TransformationPage = ({ goToTasks }) => {
    const navigate = useNavigate(); // ✅ Moved inside the component
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => setCurrentTime(video.currentTime);
        const setVideoDuration = () => setDuration(video.duration);

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("loadedmetadata", setVideoDuration);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("loadedmetadata", setVideoDuration);
        };
    }, []);

    const togglePlayPause = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="yt-container">
            {/* Video Container */}
            <div className="yt-video-wrapper"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                <video ref={videoRef} className="yt-video" poster="/wisdom-img.jpg">
                    <source src="/wisdom-audio.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </video>

                {/* Play Button Overlay (for when video is paused) */}
                {!isPlaying && (
                    <div className="yt-play-button" onClick={togglePlayPause}>
                        ▶️
                    </div>
                )}
            </div>

            {/* Progress Bar & Controls */}
            <div className={`yt-controls ${showControls ? "show" : ""}`}>
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="yt-progress-bar"
                />
                <span>{formatTime(duration)}</span>
            </div>

            {/* Play/Pause and Extra Buttons */}
            <div className="yt-buttons">
                <button onClick={togglePlayPause} className="yt-btn">
                    {isPlaying ? "⏸ Pause" : "▶️ Play"}
                </button>

                <button onClick={() => { videoRef.current.currentTime = 0; videoRef.current.play(); setIsPlaying(true); }} className="yt-btn">
                    🔄 Replay
                </button>

                <button onClick={() => navigate("/transformation")} className="yt-btn go-btn">
                    📋 Go to Daily Tasks Plan
                </button>
            </div>
        </div>
    );
};

export default TransformationPage;
 transformationpage.jsx