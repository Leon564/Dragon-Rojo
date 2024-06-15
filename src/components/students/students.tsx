import { Suspense } from "react";
import styled from "styled-components";
import {
  Button,
  Typography,
  Dropdown,
  MenuProps,
  Input,
  Form,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  SyncOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

import useTitle from "../../hooks/useTitle";
import useStudents from "../../hooks/useStudents";

import LoadingScreen from "../common/loadingScreen";
import { LEVELS } from "../../libs/constants";
import ModalStudent from "./modal-student";
import ConfirmModal from "../common/confirmModal";

const Students = () => {
  useTitle("Estudiantes");

  const {
    students,
    form,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    total,
    resetFilters,
    onEdit,
    onSave,
    deleteView,
    onDelete,
    setDeleteView,
    selected,
    setSelected,
    visibleEdit,
    setVisibleCreate,
    setVisibleEdit,
    visibleCreate,
  } = useStudents();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => setVisibleEdit(true)}>
          Editar
        </span>
      ),
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: <Link to={`/create?student=${selected}`}>Crear diploma</Link>,
      icon: <FormOutlined />,
    },
    {
      key: "3",
      label: (
        <span onClick={() => setDeleteView(true)}>
          Eliminar
        </span>
      ),
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];

  const options = LEVELS.map((level) => ({
    label: level.color,
    value: level.level,
  }));

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize, students.length);
    setLimit(pageSize);
  };

  const getBeltColor = (level: string) => {
    const levelData = LEVELS.find((l) => l.level === level);
    return levelData ? levelData.color : "Unknown";
  };

  const PaginationComponent = (props: PaginationProps) => (
    <Pagination
      {...props}
      showSizeChanger={true}
      pageSize={limit}
      current={page}
      onChange={setPage}
      total={total}
      onShowSizeChange={onShowSizeChange}
      showTotal={(total) => `Total ${total} items`}
      style={{ textAlign: "center" }}
    />
  );

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>
        <Title>Estudiantes</Title>
        <FilterSection>
          <FormContainer layout="vertical" form={form}>
            <FormItem label="Nombre" name={"name"}>
              <Input />
            </FormItem>
            <FormItem label="Nivel" name={"level"}>
              <Select options={options} />
            </FormItem>
          </FormContainer>
          <div className="flex flex-row gap-5">
            <StyledButton
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="primary"
              onClick={resetFilters}
            >
              <SyncOutlined />
            </StyledButton>
            <StyledButton
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="primary"
              onClick={() => {
                setSelected(undefined);
                setVisibleCreate(true);
              }}
            >
              <PlusOutlined />
            </StyledButton>
          </div>
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
          {loading ? (
            <LoadingScreen />
          ) : (
            students.map((item) => (
              <Row key={item._id}>
                <Col style={{ gridArea: "name" }}>
                  <Typography.Text>{`${item.firstName || item.first_name} ${
                    item.lastName || item.last_name
                  }`}</Typography.Text>
                </Col>
                <Col style={{ gridArea: "level" }}>
                  <Typography.Text>{`${getBeltColor(item.level)} ${
                    item.level
                  }`}</Typography.Text>
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

                  <Dropdown
                    menu={{ items }}
                    destroyPopupOnHide
                    trigger={["click"]}
                  >
                    <Button type="text" onClick={() => setSelected(item._id)}>
                      <EllipsisOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            ))
          )}
          <PaginationComponent />
        </ListContainer>
        <ModalStudent
          onClose={() => setVisibleEdit(false)}
          onSave={onEdit}
          open={visibleEdit}
          student={students.find((s) => s._id === selected)}
        />
        <ModalStudent
          onClose={() => setVisibleCreate(false)}
          onSave={onSave}
          open={visibleCreate}
        />
        <ConfirmModal
          open={deleteView}
          title={`${students.find((s) => s._id === selected)?.firstName}`}
          body={"¿Estás seguro de eliminar este estudiante?"}
          onOk={() => onDelete(selected!)}
          onCancel={() => setDeleteView(false)}
        />
      </div>
    </Suspense>
  );
};

export default Students;

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
