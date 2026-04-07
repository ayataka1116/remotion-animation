import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type Props = {
  children: React.ReactNode;
};

export const ComputerScreen: React.FC<Props> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Power-on glow effect
  const glowOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateClamp: true });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Screen content */}
      <div style={{ opacity: glowOpacity }}>{children}</div>

      {/* Subtle vignette effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
