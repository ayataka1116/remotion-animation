import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for scale: starts small, overshoots, settles
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  // Opacity animation: fade in over 20 frames
  const opacity = Math.min(1, frame / 20);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          fontSize: "120px",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Arial, sans-serif",
          textShadow: "4px 4px 0px #e94560",
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
