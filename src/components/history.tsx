/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getDocumentsService } from "../services/api";
import styled from "styled-components";
import {
  Button,
  Typography,
  Row as AntdRow,
  Dropdown,
  Menu,
  MenuProps,
} from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const useHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const documents = await getDocumentsService();
      setHistory(documents.data);
    };
    fetchHistory();
  }, []);
  return { history };
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const History = () => {
  const { history } = useHistory();
  console.log(history);
  return (
    <div>
      <Title>History</Title>
      <ListContainer>
        <ListHeader>
          <Row style={{ border: "none" }} header>
            <Col className="start" style={{ gridArea: "name" }}>
              <TextBold>Nombre</TextBold>
            </Col>

            <Col style={{ gridArea: "level" }}>
              <TextBold>Nivel</TextBold>
            </Col>
            <Col style={{ gridArea: "date" }}>
              <TextBold>Fecha</TextBold>
            </Col>
          </Row>
        </ListHeader>
        {history.map((item) => (
          <Row key={item._id}>
            <Col style={{ gridArea: "name" }}>
              <Typography.Text>{`${item.name} ${item.lastName}`}</Typography.Text>
            </Col>
            <Col style={{ gridArea: "level" }}>
              <Typography.Text>{item.level}</Typography.Text>
            </Col>
            <Col style={{ gridArea: "date" }}>
              <Typography.Text>{item.date}</Typography.Text>
            </Col>
            <Col style={{ gridArea: "action" }}>
              {/* make a dropdown with three points button */}
              {/* <AntdRow justify="center">
                <Button type="primary">Action</Button>
              </AntdRow> */}

              <Dropdown menu={{ items }} destroyPopupOnHide trigger={["click"]}>
                <Button type="text">
                  <span>...</span>
                </Button>
              </Dropdown>
            </Col>
          </Row>
        ))}
      </ListContainer>
    </div>
  );
};

export default History;

const Title = styled(Typography.Text)`
  display: block;
  font-size: 25px;
  margin-block: 30px 0px;
`;

const SubTitle = styled(Typography.Text)`
  display: block;

  margin-block: 0px 30px;
`;

const ListHeader = styled.div``;

const TextBold = styled(Typography.Text)`
  color: black;
  font-weight: bold;
`;

const ListContainer = styled.div<{ header?: boolean }>`
  margin-block: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* border: 1px solid gray;
  border-radius: 5px; */

  @media screen and (max-width: 769px) {
    margin-bottom: 90px;
    ${(props) =>
      props.header &&
      `       
        border:none;
  `}
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ header?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  grid-template-areas: "name level date action";
  grid-auto-rows: auto;

  border: 1px solid gray;
  padding: 15px;
  grid-column-gap: 15px;
  grid-row-gap: 15px;

  @media screen and (max-width: 769px) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "name"
      "level date"
      "action action";

    ${(props) =>
      props.header &&
      `
        display: none;
        border:none;
  `}
  }
`;
