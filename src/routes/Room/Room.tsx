import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { URL } from "../../constants";

function callPeer(id) {}

const addVideoStream = (stream: MediaStream) => {
  const videoGrid = document.getElementById("videos");
  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.srcObject = stream;
  videoGrid?.append(video);
};

export const Room: React.FC<RouteComponentProps> = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef<Socket>();
  const userVideo = useRef<HTMLVideoElement | undefined>(undefined);
  const peersRef = useRef([]);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const roomId = props.match.params.roomId;

  useEffect(() => {
    socketRef.current = io(URL);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        userVideo.current?.srcObject = stream;
        socketRef.current?.emit("join room", roomId);
        socketRef.current?.on("all users", (users) => {
          console.log("all users: ", users);
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current?.id, stream);
            peersRef.current.push({
              peerId: userId,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
        socketRef.current?.on("user disconnected", (payload) => {
          console.log("payload: ", payload);
          console.log("user disconnected: ");
          const newPeers = peersRef.current.find(
            (p) => p.peerId !== payload.socketId
          );
          console.log('newPeers: ', newPeers);
          const currentPeers = peers.filter(v => v.peerId !== payload.socketId);
          console.log('peers: ',peers);
          console.log('currentPeers: ',currentPeers);
          // peersRef.current = peersRef.current.filter(
          //   (v) => v.peerId !== payload.socketId
          // );
          // console.log("peers: ", peers);
          setPeers((p) => p.filter((v) => v.peerId !== payload));
          const item = peersRef.current.find(v => v.peerId === payload);
          console.log("ITEM :", item);
          item.peer.destroy();
          console.log("peersRef.current: ", peersRef.current);
        });
        socketRef.current?.on("user joined", (payload) => {
          const item = peersRef.current.find(
            (p) => p.peerId === payload.callerId
          );
          if (!item) {
            const peer = addPeer(payload.signal, payload.callerId, stream);
            peersRef.current.push({
              peerId: payload.callerId,
              peer,
            });
            setPeers((users) => [...users, peer]);
          }
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerId === payload.id);
          item.peer.signal(payload.signal);
        });

        console.log("stream: ", stream.id);

        // if (userVideo.current) {
        //   userVideo.current.srcObject = stream;
        // }
      })
      .catch(() => {});
  }, []);

  function createPeer(
    userToSignal: string,
    callerId: number,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current?.emit("sending signal", {
        userToSignal,
        callerId,
        signal,
      });
    });
    return peer;
  }

  function addPeer(
    incomingSignal: string,
    callerId: number,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerId });
    });
    peer.signal(incomingSignal);
    return peer;
  }
  console.log("PEERS: ",peers);
  return (
    <Container>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers
        .filter((peer) => peer.readable)
        .map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
    </Container>
  );
};

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const MyVideo: React.FC<{ ref: any }> = ({ ref }) => {
  return <video ref={ref} autoPlay playsInline muted />;
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;
