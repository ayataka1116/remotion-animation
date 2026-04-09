import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { VideoFile } from "./VideoThumbnail";

type Props = {
  video: VideoFile;
  index: number;
  scatterPosition: { x: number; y: number };
  finalPosition: { x: number; y: number };
  uploadStartFrame: number;
};

export const DraggableThumbnail: React.FC<Props> = ({
  video,
  index,
  scatterPosition,
  finalPosition,
  uploadStartFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // All thumbnails start moving at the same frame
  const animFrame = Math.max(0, frame - uploadStartFrame);

  // Spring for smooth drag motion
  const dragSpring = spring({
    frame: animFrame,
    fps,
    config: {
      damping: 18,
      stiffness: 60,
      mass: 1,
    },
  });

  // Interpolate position from scatter to final
  const currentX = interpolate(dragSpring, [0, 1], [scatterPosition.x, finalPosition.x]);
  const currentY = interpolate(dragSpring, [0, 1], [scatterPosition.y, finalPosition.y]);

  // Scale up slightly when dragging, then settle
  const scale = interpolate(dragSpring, [0, 0.3, 0.7, 1], [0.5, 1.05, 1.02, 1]);

  // Opacity - fade in quickly
  const opacity = Math.min(1, animFrame / 10);

  // Slight rotation during drag for natural feel
  const rotation = interpolate(dragSpring, [0, 0.5, 1], [-5, 3, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 120,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        cursor: "grab",
        zIndex: 100,
      }}
    >
      {/* Thumbnail area */}
      <div
        style={{
          width: 120,
          height: 75,
          borderRadius: 6,
          background: `linear-gradient(135deg, ${video.gradientColors[0]}, ${video.gradientColors[1]})`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(107, 163, 214, 0.4)",
        }}
      >
        {/* Film strip icon overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 5,
            left: 5,
            width: 20,
            height: 12,
            opacity: 0.7,
          }}
        >
          <svg viewBox="0 0 24 16" fill="white">
            <rect x="0" y="0" width="3" height="16" rx="1" />
            <rect x="5" y="0" width="3" height="16" rx="1" />
            <rect x="10" y="0" width="3" height="16" rx="1" />
            <rect x="15" y="0" width="3" height="16" rx="1" />
            <rect x="20" y="0" width="3" height="16" rx="1" />
          </svg>
        </div>

        {/* Duration badge */}
        <div
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "white",
            fontSize: 10,
            fontFamily: "Arial, sans-serif",
            padding: "1px 4px",
            borderRadius: 3,
            fontWeight: 500,
          }}
        >
          {video.duration}
        </div>
      </div>

      {/* Filename */}
      <div
        style={{
          marginTop: 3,
          width: 120,
          fontSize: 9,
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