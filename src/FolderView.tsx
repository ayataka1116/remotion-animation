import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { ComputerScreen } from "./components/ComputerScreen";
import { FolderWindow } from "./components/FolderWindow";
import { VideoFile } from "./components/VideoThumbnail";

const VIDEO_FILES: VideoFile[] = [
  { id: 1, name: "beach_sunset.mp4", duration: "0:45", gradientColors: ["#FF6B6B", "#4ECDC4"] },
  { id: 2, name: "city_night_drive.mp4", duration: "1:23", gradientColors: ["#2C3E50", "#9B59B6"] },
  { id: 3, name: "mountain_hike.mp4", duration: "2:01", gradientColors: ["#27AE60", "#3498DB"] },
  { id: 4, name: "cooking_tutorial.mp4", duration: "5:12", gradientColors: ["#E74C3C", "#F39C12"] },
  { id: 5, name: "dance_performance.mp4", duration: "3:45", gradientColors: ["#8E44AD", "#2980B9"] },
  { id: 6, name: "interview_clip.mp4", duration: "8:30", gradientColors: ["#1ABC9C", "#16A085"] },
  { id: 7, name: "sports_highlights.mp4", duration: "1:15", gradientColors: ["#E67E22", "#D35400"] },
  { id: 8, name: "concert_snippet.mp4", duration: "4:20", gradientColors: ["#9B59B6", "#E74C3C"] },
  { id: 9, name: "timelapse_clouds.mp4", duration: "0:30", gradientColors: ["#3498DB", "#2980B9"] },
];

export const FolderView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade in
  const bgOpacity = Math.min(1, frame / 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d0d",
        opacity: bgOpacity,
      }}
    >
      <ComputerScreen>
        <FolderWindow videos={VIDEO_FILES} windowEnterFrame={15} />
      </ComputerScreen>
    </AbsoluteFill>
  );
};
