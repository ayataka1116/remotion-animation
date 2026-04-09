import React from "react";
import { Composition } from "remotion";
import { Title } from "./Title";
import { FolderView } from "./FolderView";
import { UploadAnimation } from "./UploadAnimation";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={Title}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello World",
        }}
      />
      <Composition
        id="FolderView"
        component={FolderView}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UploadAnimation"
        component={UploadAnimation}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};