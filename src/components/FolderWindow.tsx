import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { VideoGrid } from "./VideoGrid";
import { VideoFile } from "./VideoThumbnail";

type Props = {
  videos: VideoFile[];
  scatterPositions: { x: number; y: number }[];
  gridPositions: { x: number; y: number }[];
  windowEnterFrame: number;
  gridEnterFrame: number;
  gatherStartFrame: number;
  gatherEndFrame: number;
};

export const FolderWindow: React.FC<Props> = ({
  videos,
  scatterPositions,
  gridPositions,
  windowEnterFrame,
  gridEnterFrame,
  gatherStartFrame,
  gatherEndFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = Math.max(0, frame - windowEnterFrame);

  // Window scale spring
  const scale = spring({
    frame: delay,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  // Window opacity
  const opacity = Math.min(1, delay / 15);

  // Traffic lights visibility
  const trafficOpacity = Math.min(1, Math.max(0, (frame - windowEnterFrame - 15) / 10));
  const titleOpacity = Math.min(1, Math.max(0, (frame - windowEnterFrame - 20) / 10));

  // Timeline bar fade in (phase 3)
  const timelineOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 620,
        height: 620,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        boxShadow: "0 10px 40px rgba(107, 163, 214, 0.3)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 40,
          backgroundColor: "#B8D4E8",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
          position: "relative",
        }}
      >
        {/* Traffic lights */}
        <div
          style={{
            display: "flex",
            gap: 8,
            opacity: trafficOpacity,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>

        {/* Folder title */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 13,
            fontFamily: "Arial, sans-serif",
            color: "#333333",
            fontWeight: 500,
            opacity: titleOpacity,
          }}
        >
          Video Editor
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: 10,
          paddingTop: 60,
          position: "relative",
        }}
      >
        <VideoGrid
          videos={videos}
          scatterPositions={scatterPositions}
          gridPositions={gridPositions}
          gridEnterFrame={gridEnterFrame}
          gatherStartFrame={gatherStartFrame}
          gatherEndFrame={gatherEndFrame}
        />

        {/* Timeline bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            height: 30,
            backgroundColor: "#E8F4FC",
            borderRadius: 6,
            opacity: timelineOpacity,
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#6BA3D6",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              backgroundColor: "#B8D4E8",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 50,
              height: 4,
              backgroundColor: "#6BA3D6",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};