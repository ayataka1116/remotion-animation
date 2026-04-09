import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type Props = {
  centerX: number;
  centerY: number;
  textDisappearFrame?: number;
};

export const UploadZone: React.FC<Props> = ({ centerX, centerY, textDisappearFrame = 30 }) => {
  const frame = useCurrentFrame();

  // Zone is always visible (border and background stay)
  const zoneOpacity = 1;

  // Text opacity - disappears at specified frame
  const textOpacity = frame >= textDisappearFrame ? 0 : 1;

  // Pulse effect
  const pulseScale = interpolate(frame, [0, 30, 60], [1, 1.02, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: centerX - 300,
        top: centerY - 200,
        width: 600,
        height: 400,
        border: "3px dashed #B8D4E8",
        borderRadius: 16,
        backgroundColor: "rgba(232, 244, 252, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: zoneOpacity,
        transform: `scale(${pulseScale})`,
      }}
    >
      {/* Upload icon - hidden when text disappears */}
      <div
        style={{
          width: 60,
          height: 60,
          marginBottom: 16,
          opacity: textOpacity,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#6BA3D6" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      {/* Upload text - hidden when text disappears */}
      <div
        style={{
          fontSize: 18,
          fontFamily: "Arial, sans-serif",
          color: "#6BA3D6",
          fontWeight: 500,
          opacity: textOpacity,
        }}
      >
        Drop videos here
      </div>

      <div
        style={{
          fontSize: 13,
          fontFamily: "Arial, sans-serif",
          color: "#B8D4E8",
          marginTop: 8,
          opacity: textOpacity,
        }}
      >
        or click to browse
      </div>
    </div>
  );
};