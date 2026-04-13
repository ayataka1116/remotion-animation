import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { UploadZone } from "./components/UploadZone";
import { DraggableThumbnail } from "./components/DraggableThumbnail";
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

// Scatter positions (thumbnails start around the edges)
const SCATTER_POSITIONS = [
  { x: 100, y: 250 },
  { x: 250, y: 180 },
  { x: 450, y: 220 },
  { x: 1300, y: 200 },
  { x: 1500, y: 300 },
  { x: 1600, y: 500 },
  { x: 1400, y: 700 },
  { x: 200, y: 800 },
  { x: 100, y: 600 },
];

// Upload zone center position (where thumbnails go)
const UPLOAD_ZONE_CENTER = { x: 960, y: 600 };

// Thumbnail size (fits inside upload zone with border)
const THUMBNAIL_WIDTH = 120;
const THUMBNAIL_HEIGHT = 75;
const THUMBNAIL_GAP = 4;

// Calculate final positions in a 3x3 grid inside upload zone
const calculateFinalPositions = () => {
  const cellSize = THUMBNAIL_WIDTH + THUMBNAIL_GAP;
  const gridWidth = 3 * cellSize - THUMBNAIL_GAP;
  const gridHeight = 3 * cellSize - THUMBNAIL_GAP;
  const startX = UPLOAD_ZONE_CENTER.x - gridWidth / 2;
  const startY = UPLOAD_ZONE_CENTER.y - gridHeight / 2 + 20; // Shift thumbnails down by 20px

  const positions = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      positions.push({
        x: startX + col * cellSize,
        y: startY + row * cellSize,
      });
    }
  }
  return positions;
};

const FINAL_POSITIONS = calculateFinalPositions();

// Animation constants
const UPLOAD_START_FRAME = 30;
const UPLOAD_END_FRAME = 120;
const STAGGER_DELAY = 0; // all thumbnails start at the same time

export const UploadAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      {/* Upload zone - text disappears at 1 second (frame 30), zone stays */}
      <UploadZone centerX={UPLOAD_ZONE_CENTER.x} centerY={UPLOAD_ZONE_CENTER.y} textDisappearFrame={30} />

      {/* Draggable thumbnails */}
      {VIDEO_FILES.map((video, index) => {
        return (
          <DraggableThumbnail
            key={video.id}
            video={video}
            index={index}
            scatterPosition={SCATTER_POSITIONS[index]}
            finalPosition={FINAL_POSITIONS[index]}
            uploadStartFrame={UPLOAD_START_FRAME}
          />
        );
      })}
    </AbsoluteFill>
  );
};