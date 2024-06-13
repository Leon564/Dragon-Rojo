/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Typography, Dropdown, MenuProps, Input, Form } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  SyncOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

import useTitle from "../hooks/useTitle";
import useStudents from "../hooks/useStudents";
import useQuery from "../hooks/useQuery";

const Students = () => {
  useTitle("Estudiantes");
  const query = useQuery();
  const { students, deleteStudent, form } = useStudents();

  const [data, setData] = useState<any>();
  
  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    const name = query.get('name');
    console.log("Name", name);
    setData({ name });
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      //label: <Link to={`/create/?doc=${selected}`}>Editar</Link>,
      label: (
        <Link to={`#`}>Editar</Link>
      ),
      icon: <EditOutlined />,
    },    
    {
      key: "2",
      label: (
        <a href={`/create?student=${selected}`}>Crear diploma</a>
      ),
      icon: <FormOutlined />,
    },
    {
      key: "3",
      label: (
        <a
          href="#"
          onClick={() => {
            deleteStudent(selected!);
            setSelected(undefined);
          }}
        >
          Eliminar
        </a>
      ),
      danger: true,
      disabled: true,
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <div>
      <Title>History</Title>
      <FilterSection>
      <FormContainer layout="vertical" form={form} initialValues={data}>
        <FormItem label="Nombre" name={'name'}>
          <Input />
        </FormItem>
        <FormItem label="Nivel" name={'label'}>
          <Input />
        </FormItem>        
      </FormContainer>
      <StyledButton className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="primary"><SyncOutlined/></StyledButton>
      <StyledButton className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="primary"><PlusOutlined/></StyledButton>
    </FilterSection>
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
              <TextBold>Fecha de nacimiento</TextBold>
            </Col>
            <Col style={{ gridArea: "created" }}>
              <TextBold>Creado</TextBold>
            </Col>
          </Row>
        </ListHeader>
        {students.map((item) => (
          <Row key={item._id}>
            <Col style={{ gridArea: "name" }}>
              <Typography.Text>{`${item.firstName} ${item.lastName}`}</Typography.Text>
            </Col>
            <Col style={{ gridArea: "level" }}>
              <Typography.Text>{`${getBeltColor(item.level)} ${item.level}`}</Typography.Text>
            </Col>
            <Col style={{ gridArea: "date" }}>
              <Typography.Text>
                {moment(item.dateOfBirth).format("DD-MM-YYYY")}
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

export default Students;

export const levels = [
  { level: "10kup", color: "Blanca" },
  { level: "9kup", color: "Blaca P.Amarillas" },
  { level: "8kup", color: "Amarilla" },
  { level: "7kup", color: "Amarilla P.Verdes" },
  { level: "6kup", color: "Verde" },
  { level: "5kup", color: "Verde P.Azules" },
  { level: "4kup", color: "Azul" },
  { level: "3kup", color: "Azul P.Rojas" },
  { level: "2kup", color: "Roja" },
  { level: "1kup", color: "Roja P.Negra" },
  { level: "1dan", color: "Negra" }
];

export function getBeltColor(level:string) {
  const levelData = levels.find(l => l.level === level);
  return levelData ? levelData.color : "Unknown";
}


const FilterSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-block: 20px 0px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: row;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const FormItem = styled(Form.Item)`
  flex: 1;
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 16px;

  @media (max-width: 768px) {
    margin-left: 0;
    align-self: center;
  }
`;

//==================================


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
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-template-columns: 1fr;
    grid-template-areas:
      "name"
      "level"
      "date"
      "created"
      "action";
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
