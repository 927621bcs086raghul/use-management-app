import React,{useEffect, useState}from "react";
import "./User.css";
import { Button, Flex, Input, Tabs, Pagination } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import UserList from "../UserList/UserList";
import UserCard from "../UserCard/UserCard";
import { useDispatch } from "react-redux";
import { fetchUsersRequest } from "../../features/users/usersSlice";
import { useSelector } from 'react-redux';
const { Search } = Input;

const User = () => {
    const dispatch=useDispatch();
        const {list,total} = useSelector((state)=> state.users);
    console.log(list,total)

  const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
    console.log("hi")
    dispatch(fetchUsersRequest({page:currentPage,per_page:6}));
  }, [currentPage]);
  const pageSize = 6;


  // --- Handle Page Change ---
  const handlePageChange = (page) => setCurrentPage(page);

  // --- Slice Data Based on Page ---
  const paginatedData = list.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
    const itemsuser = [
  {
    key: "Table",
    label: "Table",
    children: <UserList  data={paginatedData}/>,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <UserCard  data={paginatedData}/>,
    icon: <UnorderedListOutlined />,
  },
];
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
      <div className="user-pagination" style={{ marginTop: 16, textAlign: 'right' }}>
            <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
   
    </div>
  );
};

export default User;
