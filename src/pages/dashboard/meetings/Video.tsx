import React, { useEffect, useRef } from 'react';

const Video = (props: any) => {
  const videoRef = useRef(null);
  useEffect(() => {
    // console.log(props);
    videoRef.current.srcObject = props.videoStream;
  });

  return (
    <div>
      <video style={{ ...props.videoStyle }} ref={videoRef} autoPlay></video>
    </div>
  );
};

export default Video;
