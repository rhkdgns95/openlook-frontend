import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { URL } from "../../constants";
import { message, PageHeader, Space, Tag } from "antd";
import { useAppStore } from "../../stores";

enum Channel {
  JOIN = "JOIN",
  DISCONNECT = "DISCONNECT",
  GET_CURRENT_ROOM = "GET_CURRENT_ROOM",
  JOIN_ROOM = "JOIN_ROOM",
  NEW_USER = "NEW_USER",
  RECEIVING_SIGNAL = "RECEIVING_SIGNAL",
  SENDING_SIGNAL = "SENDING_SIGNAL",
  RETURNING_SIGNAL = "RETURNING_SIGNAL",
}

export const Room: React.FC<RouteComponentProps> = (props) => {
  const as = useAppStore();
  const { push } = useHistory();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef<Socket>();
  const userVideo = useRef<HTMLVideoElement | undefined>(undefined);
  const peersRef = useRef([]);
  const roomId = Number(props.match.params?.roomId || 0);
  const positionId = Number(props.match.params?.positionId || 0);

  if (!as.isEntered) {
    /** 단순히 URL로 접근하는 경우 */
    message.warn("올바른 접근방식이 아닙니다.");
    push("/");
  }

  useEffect(() => {
    socketRef.current = io(URL);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        userVideo.current?.srcObject = stream;

        /** 1. 방참가 */
        socketRef.current?.emit(Channel.JOIN, {
          roomNo: roomId,
          positionNo: positionId,
        });

        /** 2. 연결이 끊긴경우 */
        socketRef.current?.on(Channel.DISCONNECT, (positionNo) => {
          console.log(
            "before: ",
            document.getElementById(`room-${positionNo}`)
          );
          document.getElementById(`room-${positionNo}`)?.remove();
          console.log(
            "before: ",
            document.getElementById(`room-${positionNo}`)
          );
          console.log("떠남: ", positionNo);
        });

        /** 3. 기존의 방에 대한 사용자들의 정보를 불러옮 */
        socketRef.current?.on(Channel.GET_CURRENT_ROOM, (roomDetails) => {
          console.log("PAYLOAD: ", roomDetails);
          if (roomDetails.length) {
            const peers = [];
            if (!!roomDetails?.length) {
              roomDetails?.forEach((roomDetail) => {
                const peer = createPeer(
                  roomDetail.socketId,
                  socketRef.current?.id,
                  stream,
                  positionId
                );
                peersRef.current.push({
                  peer,
                  socketId: roomDetail.socketId,
                  no: roomDetail.no,
                });
                peers.push({
                  peer: peer,
                  no: roomDetail.no,
                });
              });
              setPeers(peers);
            } else {
              setPeers([]);
            }
          }
        });

        /** 4. 새 유저가 접속한경우. */
        socketRef.current?.on(Channel.NEW_USER, (payload) => {
          const item = peersRef.current.find(
            (p) => p.socketId === payload.callerId
          );
          if (!item) {
            const peer = addPeer(payload.signal, payload.callerId, stream);
            peersRef.current.push({
              peer,
              socketId: payload.callerId,
            });
            setPeers((peers) => [...peers, { peer: peer, no: payload.no }]);
          }
        });
        console.log("stream: ", stream.id);

        /** 5. 스트림 정보를 받기위함. */
        socketRef.current.on(Channel.RECEIVING_SIGNAL, (payload) => {
          const item = peersRef.current.find((p) => p.socketId === payload.id);
          item.peer.signal(payload.signal);
        });
      })
      .catch(() => {});

    return () => {
      socketRef.current?.disconnect();
      // socketRef.current?.close();
    };
  }, []);

  function createPeer(
    userToSignal: string,
    callerId: number,
    stream: MediaStream,
    no: number
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      /** 6. 스트림 정보를 전송함. */
      socketRef.current?.emit(Channel.SENDING_SIGNAL, {
        userToSignal,
        callerId,
        signal,
        no,
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
      socketRef.current.emit(Channel.RETURNING_SIGNAL, { signal, callerId });
    });
    peer.signal(incomingSignal);
    return peer;
  }
  console.log("PEERS: ", peers);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          push("/");
          as.onChangeIsEntered(false);
        }}
        title="뒤로가기"
        subTitle={`${roomId}번 클래스`}
      />
      <Container>
        <Space
          direction="vertical"
          style={{ width: "100%", alignItems: "center" }}
        >
          <Tag color="blue">{positionId}번 자리</Tag>
          <StyledVideo ref={userVideo} autoPlay playsInline />
        </Space>
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrap
        >
          {peers.map((peer, index) => {
            return <Video key={peer.no} no={peer.no} peer={peer.peer} />;
          })}
        </Space>
        <hr />
      </Container>
    </>
  );
};

const Video = (props) => {
  const ref = useRef<HTMLVideoElement>();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
    props.peer.on("close", () => {
      document.getElementById(`container-${props.no}`)?.remove();
    });
    return () => {
      document.getElementById(`container-${props.no}`)?.remove();
      // ref.current?.remove();
    };
  }, []);

  return (
    <VideoContainer id={`room-${props.no}`}>
      <Tag color="orange">{props.no}번 자리</Tag>
      {/* <StyledVideo playsInline autoPlay ref={ref} muted /> */}
      <StyledVideo playsInline autoPlay ref={ref} />
    </VideoContainer>
  );
};

const MyVideo: React.FC<{ ref: any }> = ({ ref }) => {
  return <video ref={ref} autoPlay playsInline />;
};

const Container = styled.div`
  display: flex;
  min-height: 80vh;
  width: 100%;
  margin: 0 auto;
  flex-flow: column;
  justify-content: center;
`;
const VideoContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const StyledVideo = styled.video`
  max-height: 400px;
  box-shadow: 0 2px 14px rgb(0 0 0 / 42%);
  border-radius: 6px;
`;
