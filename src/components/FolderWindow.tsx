import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { VideoGrid } from "./VideoGrid";
import { VideoFile } from "./VideoThumbnail";

type Props = {
  videos: VideoFile[];
  windowEnterFrame: number;
};

export const FolderWindow: React.FC<Props> = ({ videos, windowEnterFrame }) => {
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

  return (
    <div
      style={{
        width: 620,
        height: 620,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 40,
          backgroundColor: "#f5f5f5",
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
          Videos
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: 10,
          paddingTop: 60,
        }}
      >
        <VideoGrid videos={videos} gridEnterFrame={windowEnterFrame + 30} />
      </div>
    </div>
  );
};
