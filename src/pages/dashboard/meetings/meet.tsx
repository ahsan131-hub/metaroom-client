// import Video from 'next-seo/lib/jsonld/video';
import React, { useEffect, useState } from 'react';

import Video from './Video';

const Meet = () => {
  const constraints = { video: true, audio: false };
  const [localStream, setlocalStream] = useState();
  // const [remoteStream, setRemoteStream] = useState();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const success = (stream: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    // window?.localStream = stream;
    // localVideoRef.current.srcObject = stream;
    // whoIsOnline();

    setlocalStream(stream);
    // pc[socket.id].addStream(stream);
  };

  const failure = (e: any) => {
    console.log('get User Media: ', e);
  };
  useEffect(() => {
    // pc[socket.id].ontrack = (e) => {
    // remoteVideoRef.current.srcObject = e.streams[0];
    //   setRemoteStream(e.streams[0]);
    // };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(success)
      .then(failure);
  }, []);

  // actions buttons

  return (
    <>
      <div>
        <Video
          // ref={localVideoRef}
          // style={{ height: 240, width: 240, margin: 10, background: "black" }}
          videoStream={localStream}
          videoStyle={{
            height: '100%',
            width: '100%',
            zIndex: 1,
            position: 'fixed',
            right: '0%',
            bottom: '0%',
            background: 'black',
          }}
        ></Video>
        {/* <Video
          // ref={localVideoRef}
          // style={{ height: 240, width: 240, margin: 10, background: "black" }}
          videoStream={remoteStream}
          videoStyle={{
            height: '100%',
            width: '100%',
            zIndex: 1,
            position: 'fixed',
            right: '0%',
            bottom: '0%',
            background: 'black',
          }}
        ></Video> */}
      </div>
      <div
        style={{
          margin: 10,
          zIndex: 100,
          position: 'fixed',
          left: '50%',
          top: '90%',
        }}
      >
        {/* <h1 style={{ color: 'white' }}>{socket?.id}</h1> */}

        {/* <button onClick={createOffer}>create offer </button>
        <button onClick={answerOffer}>create answer</button> */}
      </div>
    </>
  );
};

export default Meet;
