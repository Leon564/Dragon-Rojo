import { useState } from "react";
import styled from "styled-components";
import { Button, Typography, Dropdown, MenuProps } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import useHistory from "../hooks/useHistory";
import useTitle from "../hooks/useTitle";

const History = () => {
  useTitle("Historial");
  const { history, download, deleteDocument } = useHistory();
  
  const [selected, setSelected] = useState<string | undefined>();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={`/create/?doc=${selected}`}>Editar</Link>,
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: (
        <span onClick={() => download(selected!, "docx")}>
          descargar Docx
        </span>
      ),
      icon: <DownloadOutlined />,
    },
    {
      key: "3",
      label: (
        <span onClick={() => download(selected!, "pdf")}>
          descargar PDF
        </span>
      ),
      icon: <DownloadOutlined />,
    },
    {
      key: "4",
      label: (
        <span
          onClick={() => {
            deleteDocument(selected!);
            setSelected(undefined);
          }}
        >
          Eliminar
        </span>
      ),
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];

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
            <Col style={{ gridArea: "created" }}>
              <TextBold>Creado</TextBold>
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
              <Typography.Text>
                {moment(item.date).format("DD-MM-YYYY")}
              </Typography.Text>
            </Col>
            <Col style={{ gridArea: "created" }}>
              <Typography.Text>
                {moment(item.createdAt).format("DD-MM-YYYY-hh:mm")}
              </Typography.Text>
            </Col>
            <Col style={{ gridArea: "action" }}>
              {/* make a dropdown with three points button */}
              {/* <AntdRow justify="center">
                <Button type="primary">Action</Button>
              </AntdRow> */}

              <Dropdown menu={{ items }} destroyPopupOnHide trigger={["click"]}>
                <Button type="text" onClick={() => setSelected(item._id)}>
                  <EllipsisOutlined />
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 100px;
  grid-template-areas: "name level date created action";
  grid-auto-rows: auto;

  justify-content: center;
  align-items: center;

  padding: 15px;
  grid-column-gap: 15px;
  grid-row-gap: 15px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;

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
        
  `}
  }

  ${(props) =>
    props.header &&
    `
   box-shadow: none;
    background-color: #f0f0f0;
    font-weight: bold;
    border-radius: 5px;
  `}
`;
