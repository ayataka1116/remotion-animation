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
  scatterPosition: { x: number; y: number };
  gridPosition: { x: number; y: number };
  gatherStartFrame: number;
  gatherEndFrame: number;
};

export const VideoThumbnail: React.FC<Props> = ({
  video,
  index,
  enterFrame,
  scatterPosition,
  gridPosition,
  gatherStartFrame,
  gatherEndFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Entrance spring (frames 0-30)
  const entranceDelay = Math.max(0, frame - enterFrame);
  const entranceProgress = Math.min(entranceDelay, 30);

  // Opacity - fade in from frame 0 (when enterFrame arrives)
  const entranceOpacity = entranceDelay > 0 ? Math.min(1, entranceProgress / 10) : 0;

  // Scale spring
  const scale = spring({
    frame: entranceProgress,
    fps,
    config: {
      damping: 12,
      stiffness: 90,
      mass: 0.5,
    },
  });

  // Phase 2: Gathering motion (frames 60-120)
  const gatherFrame = Math.max(0, frame - gatherStartFrame);

  const gatherSpring = spring({
    frame: gatherFrame,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.5 },
  });

  // Interpolated position from scatter to grid
  const currentX = interpolate(gatherSpring, [0, 1], [scatterPosition.x, gridPosition.x]);
  const currentY = interpolate(gatherSpring, [0, 1], [scatterPosition.y, gridPosition.y]);

  // Combined opacity: entrance fade in + visibility during gather
  const opacity = Math.max(entranceOpacity, frame >= gatherStartFrame ? 1 : 0);

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 180,
        opacity,
        transform: `scale(${scale})`,
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
