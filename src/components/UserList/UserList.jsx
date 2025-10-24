import { Avatar, Button, Table,Flex,Popconfirm   } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserList.css";
import { getSingleUserRequest } from "../../features/users/usersSlice";
const UserList = ({ data }) => {
  const { loading } = useSelector((state) => state.users);
  const dispatch=useDispatch();
  const columns = [
    {
      dataIndex: "avatar",
      align: "center",
      width: "250px",
      render: (src) => <Avatar src={src} />,
    },

    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => <a>{record.email}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (_, record) => `${record.first_name || ""}`,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (_, record) => `${record.last_name || ""}`,
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Flex gap={15}>
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(record?.id)
              }}
            >
              Edit
            </Button>
            <Popconfirm
            title="Are you sure to delete this user"
          placement="top"
          okText="Yes"
          cancelText="No"
          onConfirm={(e)=>{
            e.stopPropagation()
            console.log(record)}}
        >
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              danger
              onClick={(e)=>{
                e.stopPropagation()
                
              }}
            >
              Delete
            </Button></Popconfirm>
          </Flex>
        );},
    },
  ];
  const handleEdit=(id)=>{
    dispatch(getSingleUserRequest(id));
  }
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        loading={loading}
      ></Table>
    </div>
  );
};

export default UserList;
