import React from "react";
import BigTextEffect from "@/components/Login/BigTextEffect";
import UploadZone from "@/components/Upload/UploadZone";

const Upload = () => {
  return (
    <main>
      <BigTextEffect headline="Upload your poster" direction={1} />
      <UploadZone />
    </main>
  );
};

export default Upload;
