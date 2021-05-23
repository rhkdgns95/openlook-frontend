import { Form, Button, Select, Space, Typography, message } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { URL } from "../../constants";
import { useAppStore } from "../../stores";

export const Home = () => {
  const [rooms, setRooms] = useState([]);
  const { push } = useHistory();
  const as = useAppStore();
  const { data } = useQuery(
    "rooms",
    () =>
      fetch(URL + `/api/room`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
    {
      onSuccess: async (e) => {
        const data = await e.json();
        setRooms(data);
      },
      onError: (e) => {
        console.log("onError: ", e);
      },
    }
  );
  const { mutate } = useMutation(
    "connectRoom",
    (params: { roomNo: number; positionNo: number }) =>
      fetch(URL + `/api/room/${params.roomNo}/position/${params.positionNo}`, {
        method: "POST",
        body: JSON.stringify({ userId: "1", userName: "kkh" }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: async (e) => {
        console.log("onSuccess: ", e);
        const res = await e.json();
        if (res.ok) {
          as.onChangeIsEntered(true);
          push(`/room/${res.roomNo}/position/${res.positionNo}`);
        } else {
          message.error("이미 존재하는 자리입니다.");
        }
      },
      onError: (e) => {
        console.log("onError: ", e);
      },
    }
  );
  console.log("data : ", data);
  // const onClick = (roomNo: number) => {
  //   if (!positionNo) {
  //     return alert("자리는 0보다큰 숫자로 입력해주세요");
  //   }
  //   mutate({ roomNo, positionNo });
  //   // push(`/room/${roomNo}`);
  // };

  const onFinish = (e) => {
    mutate({ roomNo: e.roomNo, positionNo: e.positionNo });
    console.log("E: ", e);
  };

  return (
    <Container>
      <Space direction="vertical" style={{ alignItems: "center" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          (1~6번) 클래스의 자리를 선택하여 참가해주세요.
        </Typography.Title>
        <Space direction="vertical">
          <Space>
            <Form onFinish={onFinish} layout="inline">
              <Form.Item name="roomNo" initialValue={1} hidden />
              <Form.Item
                name="positionNo"
                rules={[
                  {
                    required: true,
                    message: "특정 자리를 선택해주세요.",
                  },
                ]}
              >
                <Select
                  style={{ width: 300 }}
                  placeholder="1번 클래스의 자리를 선택해주세요"
                >
                  <Select.Option value={1}>1번자리</Select.Option>
                  <Select.Option value={2}>2번자리</Select.Option>
                  <Select.Option value={3}>3번자리</Select.Option>
                  <Select.Option value={4}>4번자리</Select.Option>
                  <Select.Option value={5}>5번자리</Select.Option>
                  <Select.Option value={6}>6번자리</Select.Option>
                  <Select.Option value={7}>7번자리</Select.Option>
                  <Select.Option value={8}>8번자리</Select.Option>
                  <Select.Option value={9}>9번자리</Select.Option>
                  <Select.Option value={10}>10번자리</Select.Option>
                </Select>
              </Form.Item>
              <Button htmlType="submit">1번 클래스 참가</Button>
            </Form>
          </Space>
          <>
            {rooms.length > 0 && !!rooms[0].details?.length && (
              <span>
                참여자 :{" "}
                {rooms[0].details?.map((v, i) => (
                  <span style={{ color: "red" }}>
                    {i > 0 && <span>, </span>}
                    {v.no}번
                  </span>
                ))}{" "}
              </span>
            )}
          </>
        </Space>
        <Space direction="vertical">
          <Space>
            <Form onFinish={onFinish} layout="inline">
              <Form.Item name="roomNo" initialValue={2} hidden />
              <Form.Item
                name="positionNo"
                rules={[
                  {
                    required: true,
                    message: "특정 자리를 선택해주세요.",
                  },
                ]}
              >
                <Select
                  style={{ width: 300 }}
                  placeholder="2번 클래스의 자리를 선택해주세요"
                >
                  <Select.Option value={1}>1번자리</Select.Option>
                  <Select.Option value={2}>2번자리</Select.Option>
                  <Select.Option value={3}>3번자리</Select.Option>
                  <Select.Option value={4}>4번자리</Select.Option>
                  <Select.Option value={5}>5번자리</Select.Option>
                  <Select.Option value={6}>6번자리</Select.Option>
                  <Select.Option value={7}>7번자리</Select.Option>
                  <Select.Option value={8}>8번자리</Select.Option>
                  <Select.Option value={9}>9번자리</Select.Option>
                  <Select.Option value={10}>10번자리</Select.Option>
                </Select>
              </Form.Item>
              <Button htmlType="submit">2번 클래스 참가</Button>
            </Form>
          </Space>
          <>
            {rooms.length > 0 && rooms[1] && !!rooms[1].details?.length && (
              <span>
                참여자 :{" "}
                {rooms[1].details?.map((v, i) => (
                  <span style={{ color: "red" }}>
                    {i > 0 && <span>, </span>}
                    {v.no}번
                  </span>
                ))}{" "}
              </span>
            )}
          </>
        </Space>
        <Space>
          <Form onFinish={onFinish} layout="inline">
            <Form.Item name="roomNo" initialValue={1} hidden />
            <Form.Item
              name="positionNo"
              rules={[
                {
                  required: true,
                  message: "특정 자리를 선택해주세요.",
                },
              ]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="3번 클래스의 자리를 선택해주세요"
              >
                <Select.Option value={1}>1번자리</Select.Option>
                <Select.Option value={2}>2번자리</Select.Option>
                <Select.Option value={3}>3번자리</Select.Option>
                <Select.Option value={4}>4번자리</Select.Option>
                <Select.Option value={5}>5번자리</Select.Option>
                <Select.Option value={6}>6번자리</Select.Option>
                <Select.Option value={7}>7번자리</Select.Option>
                <Select.Option value={8}>8번자리</Select.Option>
                <Select.Option value={9}>9번자리</Select.Option>
                <Select.Option value={10}>10번자리</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">3번 클래스 참가</Button>
          </Form>
        </Space>
        <Space>
          <Form onFinish={onFinish} layout="inline">
            <Form.Item name="roomNo" initialValue={1} hidden />
            <Form.Item
              name="positionNo"
              rules={[
                {
                  required: true,
                  message: "특정 자리를 선택해주세요.",
                },
              ]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="4번 클래스의 자리를 선택해주세요"
              >
                <Select.Option value={1}>1번자리</Select.Option>
                <Select.Option value={2}>2번자리</Select.Option>
                <Select.Option value={3}>3번자리</Select.Option>
                <Select.Option value={4}>4번자리</Select.Option>
                <Select.Option value={5}>5번자리</Select.Option>
                <Select.Option value={6}>6번자리</Select.Option>
                <Select.Option value={7}>7번자리</Select.Option>
                <Select.Option value={8}>8번자리</Select.Option>
                <Select.Option value={9}>9번자리</Select.Option>
                <Select.Option value={10}>10번자리</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">4번 클래스 참가</Button>
          </Form>
        </Space>
        <Space>
          <Form onFinish={onFinish} layout="inline">
            <Form.Item name="roomNo" initialValue={1} hidden />
            <Form.Item
              name="positionNo"
              rules={[
                {
                  required: true,
                  message: "특정 자리를 선택해주세요.",
                },
              ]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="5번 클래스의 자리를 선택해주세요"
              >
                <Select.Option value={1}>1번자리</Select.Option>
                <Select.Option value={2}>2번자리</Select.Option>
                <Select.Option value={3}>3번자리</Select.Option>
                <Select.Option value={4}>4번자리</Select.Option>
                <Select.Option value={5}>5번자리</Select.Option>
                <Select.Option value={6}>6번자리</Select.Option>
                <Select.Option value={7}>7번자리</Select.Option>
                <Select.Option value={8}>8번자리</Select.Option>
                <Select.Option value={9}>9번자리</Select.Option>
                <Select.Option value={10}>10번자리</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">5번 클래스 참가</Button>
          </Form>
        </Space>
        <Space>
          <Form onFinish={onFinish} layout="inline">
            <Form.Item name="roomNo" initialValue={1} hidden />
            <Form.Item
              name="positionNo"
              rules={[
                {
                  required: true,
                  message: "특정 자리를 선택해주세요.",
                },
              ]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="6번 클래스의 자리를 선택해주세요"
              >
                <Select.Option value={1}>1번자리</Select.Option>
                <Select.Option value={2}>2번자리</Select.Option>
                <Select.Option value={3}>3번자리</Select.Option>
                <Select.Option value={4}>4번자리</Select.Option>
                <Select.Option value={5}>5번자리</Select.Option>
                <Select.Option value={6}>6번자리</Select.Option>
                <Select.Option value={7}>7번자리</Select.Option>
                <Select.Option value={8}>8번자리</Select.Option>
                <Select.Option value={9}>9번자리</Select.Option>
                <Select.Option value={10}>10번자리</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">6번 클래스 참가</Button>
          </Form>
        </Space>
      </Space>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
