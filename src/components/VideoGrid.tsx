import React from "react";
import { VideoThumbnail, VideoFile } from "./VideoThumbnail";

type Props = {
  videos: VideoFile[];
  gridEnterFrame: number;
};

export const VideoGrid: React.FC<Props> = ({ videos, gridEnterFrame }) => {
  const staggerOffset = 8; // frames between each thumbnail entrance

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 180px)",
        gridTemplateRows: "repeat(3, 150px)",
        gap: 20,
        padding: 20,
      }}
    >
      {videos.map((video, index) => (
        <VideoThumbnail
          key={video.id}
          video={video}
          index={index}
          enterFrame={gridEnterFrame + index * staggerOffset}
        />
      ))}
    </div>
  );
};
