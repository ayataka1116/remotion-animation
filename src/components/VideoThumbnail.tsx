import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export type VideoFile = {
  id: number;
  name: string;
  duration: string;
  gradientColors: [string, string];
};

type Props = {
  video: VideoFile;
  index: number;
  enterFrame: number;
};

export const VideoThumbnail: React.FC<Props> = ({ video, index, enterFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = Math.max(0, frame - enterFrame);
  const progress = Math.min(delay, 30); // clamp so animation completes and stays

  // Spring animation for scale
  const scale = spring({
    frame: progress,
    fps,
    config: {
      damping: 12,
      stiffness: 90,
      mass: 0.5,
    },
  });

  // Opacity fade in
  const opacity = Math.min(1, progress / 10);

  // Translate Y from below
  const translateY = interpolate(progress, [0, 20], [100, 0], { extrapolateClamp: true });

  // Slight rotation
  const rotation = interpolate(progress, [0, 20], [-5, 0], { extrapolateClamp: true });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 180,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      {/* Thumbnail area */}
      <div
        style={{
          width: 180,
          height: 120,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${video.gradientColors[0]}, ${video.gradientColors[1]})`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Film strip icon overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            width: 24,
            height: 16,
            opacity: 0.7,
          }}
        >
          <svg viewBox="0 0 24 16" fill="white">
            <rect x="0" y="0" width="4" height="16" rx="1" />
            <rect x="6" y="0" width="4" height="16" rx="1" />
            <rect x="12" y="0" width="4" height="16" rx="1" />
            <rect x="18" y="0" width="4" height="16" rx="1" />
          </svg>
        </div>

        {/* Duration badge */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "white",
            fontSize: 11,
            fontFamily: "Arial, sans-serif",
            padding: "2px 6px",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          {video.duration}
        </div>
      </div>

      {/* Filename */}
      <div
        style={{
          marginTop: 6,
          width: 180,
          fontSize: 11,
          fontFamily: "Arial, sans-serif",
          color: "#333333",
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {video.name}
      </div>
    </div>
  );
};
