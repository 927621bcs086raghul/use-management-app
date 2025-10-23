import React, { useEffect } from "react";
import "./User.css";
import { Button, Flex, Input, Tabs, Tag } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import UserList from "../UserList/UserList";
import UserCard from "../UserCard/UserCard";
import { useDispatch } from "react-redux";
const { Search } = Input;
const itemsuser = [
  {
    key: "Table",
    label: "Table",
    children: <UserList />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <UserCard />,
    icon: <UnorderedListOutlined />,
  },
];

const User = () => {
    const dispatch=useDispatch();
   
  return (
    <div className="user-data-bady">
      <div className="view-user">
        <Flex justify="space-between" className="view-user-head">
          <h2>Users</h2>
          <Flex gap={15} align="center">
            <Search placeholder="Input search text" />
            <Button type="primary" style={{ marginTop: "0", borderRadius: 0 }}>
              Create User
            </Button>
          </Flex>
        </Flex>
        <Tabs items={itemsuser} className="card-table-user-view"></Tabs>
      </div>
    </div>
  );
};

export default User;
