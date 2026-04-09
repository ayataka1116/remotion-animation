import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ComputerScreen } from "./components/ComputerScreen";
import { FolderWindow } from "./components/FolderWindow";
import { VideoFile } from "./components/VideoThumbnail";

const VIDEO_FILES: VideoFile[] = [
  { id: 1, name: "beach_sunset.mp4", duration: "0:45", gradientColors: ["#6BA3D6", "#B8D4E8"] },
  { id: 2, name: "city_night_drive.mp4", duration: "1:23", gradientColors: ["#B8D4E8", "#6BA3D6"] },
  { id: 3, name: "mountain_hike.mp4", duration: "2:01", gradientColors: ["#E8F4FC", "#6BA3D6"] },
  { id: 4, name: "cooking_tutorial.mp4", duration: "5:12", gradientColors: ["#6BA3D6", "#E8F4FC"] },
  { id: 5, name: "dance_performance.mp4", duration: "3:45", gradientColors: ["#B8D4E8", "#E8F4FC"] },
  { id: 6, name: "interview_clip.mp4", duration: "8:30", gradientColors: ["#6BA3D6", "#B8D4E8"] },
  { id: 7, name: "sports_highlights.mp4", duration: "1:15", gradientColors: ["#E8F4FC", "#B8D4E8"] },
  { id: 8, name: "concert_snippet.mp4", duration: "4:20", gradientColors: ["#B8D4E8", "#6BA3D6"] },
  { id: 9, name: "timelapse_clouds.mp4", duration: "0:30", gradientColors: ["#6BA3D6", "#E8F4FC"] },
];

// Scatter positions in upper screen area
const SCATTER_POSITIONS = [
  { x: 80, y: 100 },
  { x: 250, y: 80 },
  { x: 450, y: 120 },
  { x: 650, y: 90 },
  { x: 850, y: 130 },
  { x: 1050, y: 85 },
  { x: 150, y: 280 },
  { x: 500, y: 320 },
  { x: 900, y: 260 },
];

// Grid positions (center convergence)
const calculateGridPositions = () => {
  const startX = 650;
  const startY = 275;
  const colWidth = 200;
  const rowHeight = 170;

  const positions = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      positions.push({
        x: startX + col * colWidth,
        y: startY + row * rowHeight,
      });
    }
  }
  return positions;
};

const GRID_POSITIONS = calculateGridPositions();

// Animation constants - adjusted timing
const WINDOW_ENTER_FRAME = 5;
const GRID_ENTER_FRAME = 15; // grid starts appearing at frame 15
const GATHER_START_FRAME = 90; // gathering starts at frame 90
const GATHER_END_FRAME = 150; // gathering ends at frame 150

export const FolderView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8F4FC",
        opacity: bgOpacity,
      }}
    >
      <ComputerScreen>
        <FolderWindow
          videos={VIDEO_FILES}
          scatterPositions={SCATTER_POSITIONS}
          gridPositions={GRID_POSITIONS}
          windowEnterFrame={WINDOW_ENTER_FRAME}
          gatherStartFrame={GATHER_START_FRAME}
          gatherEndFrame={GATHER_END_FRAME}
          gridEnterFrame={GRID_ENTER_FRAME}
        />
      </ComputerScreen>
    </AbsoluteFill>
  );
};