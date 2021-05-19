import { Button, Space } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
  const { push } = useHistory();
  const onClick = (roomId: number) => {
    push(`/room/${roomId}`);
  };

  return (
    <Container>
      <Space>
        <Button onClick={() => onClick(1)}>1번 클래스 참가</Button>
        <Button onClick={() => onClick(2)}>2번 클래스 참가</Button>
        <Button onClick={() => onClick(3)}>3번 클래스 참가</Button>
        <Button onClick={() => onClick(4)}>4번 클래스 참가</Button>
        <Button onClick={() => onClick(5)}>5번 클래스 참가</Button>
        <Button onClick={() => onClick(6)}>6번 클래스 참가</Button>
      </Space>
    </Container>
  );
};
const Container = styled.div``;
