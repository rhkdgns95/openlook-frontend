# openlook-frontend
- (Cam-enabled device) A project that accesses a specific chat room and shares video with other people.
- Implementing webrtc using peerjs's library.

## Screen
- 하나의 특정방에 유저들이 참여하는 경우  
  <img src="https://user-images.githubusercontent.com/46029124/122136104-c74e5c00-ce7c-11eb-9ec7-5361d78d0556.gif" width="100%">
- 다른 방에 참여하는 경우  
  <img src="https://user-images.githubusercontent.com/46029124/122136149-d46b4b00-ce7c-11eb-8afd-0b428248259b.gif" width="100%">



## Todo
- [x] N개의 Room에서 특정 Position을 선택하여 접속이 가능 (중복된 position 선택은 불가능)
- [x] 다른 사람이 접속한 Room과 Position을 실시간 확인.
- [x] Process 1-1. (방 참여전) 서버에 요청없이 특정 방에 해당하는 URL로 접근을 제한.
- [x] Process 1-2. (방 참여전) 참여할 방의 정보 및 현 유저의 스트림 정보를 서버에 전송 후, 결과값을 통해 특정방에 접속.
- [x] Process 2. (방 참여시) 현재 공유되어진 캠 정보들을 불러옴.
- [x] Process 3. (방 참여중) 같은 Room의 다른 유저가 참여하는 경우, 해당 유저의 스트림 정보를 가져와 서로 공유하는 화면이 구성 됨.
- [x] Process 4. (방 참여 → 퇴장) 열어둔 소켓정보를 닫음.
- [x] Process 5. (방 퇴장시) 해당 Room의 영상을 공유하는 유저들의 화면이 업데이트 (퇴장한 유저의 화면을 삭제)
- [x] Process 6. (방 퇴장시) 해당 Room의 퇴장한 유저의 Position이 활성화 되어짐 (다른 유저가 접속이 가능)
 

## Refs
- [webrtc](https://webrtc.org/getting-started/media-devices)
- [simple-peer](https://github.com/feross/simple-peer) 
- [parcel-bundeler](https://parceljs.org/)
- [zustand](https://github.com/pmndrs/zustand)
- [react-query](https://react-query.tanstack.com/)
