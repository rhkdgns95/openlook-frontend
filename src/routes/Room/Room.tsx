import { useEffect } from "react";
import Peer from "simple-peer";

function getStream() {
  console.log('getStram()');
  // get video/voice stream
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then(gotMedia)
    .catch((err) => {
      console.log("error: ", err);
    });

  function gotMedia(stream) {
    console.log('stream: ', stream);
    var peer1 = new Peer({
      initiator: true,
      stream: stream,
    });
    var peer2 = new Peer();
    console.log('peer1: ', peer1);
    peer1.on("signal", (data) => {
      console.log("peer1 signal");
      peer2.signal(data);
    });

    peer2.on("signal", (data) => {
      console.log("peer2 signal");
      peer1.signal(data);
    });
    peer1.addStream(stream);
    // peer1.on("stream", (stream) => {
    //   // got remote video stream, now let's show it in a video tag
    //   var video: HTMLVideoElement | null = document.querySelector("video");

    //   if (video) {
    //     console.log("video: ", video);
    //     if ("srcObject" in video) {
    //       console.log("stream: ",stream);
    //       video.srcObject = stream;
    //     } else {
    //       video.src = window.URL.createObjectURL(stream); // for older browsers
    //     }
    //     video.play();
    //   }
    // });
    peer2.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      var video: HTMLVideoElement | null = document.querySelector("video");

      if (video) {
        console.log("video: ", video);
        if ("srcObject" in video) {
          console.log("stream: ",stream);
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream); // for older browsers
        }
        video.play();
      }
    });
  }
}

export const Room = () => {
  useEffect(() => {
    getStream();
  }, []);
  return (
    <>
      <video></video>
      room...
    </>
  );
};
