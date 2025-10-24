import React, { useEffect, useState } from "react";
import "./User.css";
import { Button, Flex, Input, Tabs, Pagination,Spin } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import UserList from "../UserList/UserList";
import UserCard from "../UserCard/UserCard";
import { useDispatch } from "react-redux";
import { fetchUsersRequest,searchUserFilter,modalOpener } from "../../features/users/usersSlice";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
const { Search } = Input;
const User = () => {
  const dispatch = useDispatch();
  const { list, total } = useSelector((state) => state.users);
  const [search,setSearch]=useState("");
  const debouncedSearch=useDebounce(search,500)
  console.log(list)
  const [currentPage, setCurrentPage] = useState(1);
  const page =list.length/6+1;
  useEffect(() => {
    if(list?.length >= total && total!=0){
      return;
    }
    if(list.length<total && total !=0 ){
    dispatch(fetchUsersRequest({ page: page, per_page: 6 }));
  }

  }, [currentPage,page]);
  useEffect(()=>{
    dispatch(fetchUsersRequest({ page: currentPage, per_page: 6 }));

  },[])
  const pageSize = 6;

  const handlePageChange = (page) => 
   
    setCurrentPage(page);

  const paginatedData = list.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  useEffect(()=>{
    dispatch(searchUserFilter(debouncedSearch));
    setCurrentPage(1);
  },[debouncedSearch])
  const itemsuser = [
    {
      key: "Table",
      label: "Table",
      children: <UserList data={paginatedData} />,
      icon: <TableOutlined />,
    },
    {
      key: "card",
      label: "card",
      children: <UserCard data={paginatedData} />,
      icon: <UnorderedListOutlined />,
    },
  ];

  return (
    <div className="user-data-bady">
      
      <div className="view-user">
        <Flex justify="space-between" className="view-user-head">
          <h2>Users</h2>
          <Flex gap={15} align="center" className="search-create-user-button-container">
            <Search placeholder="Input search text" onChange={(e)=> setSearch(e.target.value)} />
            <Button type="primary" className="buttons" onClick={()=>dispatch(modalOpener())}>
              Create User
            </Button>
          </Flex>
        </Flex>
        <Tabs items={itemsuser} className="card-table-user-view"></Tabs>
      </div>
      <div
        className="user-pagination"
      >
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
