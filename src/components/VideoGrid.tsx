import React from "react";
import { VideoThumbnail, VideoFile } from "./VideoThumbnail";

type Props = {
  videos: VideoFile[];
  scatterPositions: { x: number; y: number }[];
  gridPositions: { x: number; y: number }[];
  gridEnterFrame: number;
  gatherStartFrame: number;
  gatherEndFrame: number;
};

export const VideoGrid: React.FC<Props> = ({
  videos,
  scatterPositions,
  gridPositions,
  gridEnterFrame,
  gatherStartFrame,
  gatherEndFrame,
}) => {
  const staggerOffset = 8; // frames between each thumbnail entrance

  return (
    <div
      style={{
        position: "relative",
        width: 620,
        height: 570,
      }}
    >
      {videos.map((video, index) => (
        <VideoThumbnail
          key={video.id}
          video={video}
          index={index}
          enterFrame={gridEnterFrame + index * staggerOffset}
          scatterPosition={scatterPositions[index]}
          gridPosition={gridPositions[index]}
          gatherStartFrame={gatherStartFrame}
          gatherEndFrame={gatherEndFrame}
        />
      ))}
    </div>
  );
};