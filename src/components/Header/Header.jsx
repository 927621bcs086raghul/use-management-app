import React from 'react';
import { Avatar, Flex, Layout, Popconfirm, Popover } from 'antd';
import { ProfileOutlined, LogoutOutlined} from '@ant-design/icons';
import './Header.css'
import { logoutRequest } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
const { Header:Head } = Layout;
const Header = () => {
  const dispatch =useDispatch();
  const handleLogout=()=>{
    dispatch(logoutRequest());
  }
  return (
    <Head className="header">
      <Flex align="center" gap={'20px'}>
      <p  className='header-p'> Elon Musk</p>
      <Popconfirm
       title="Are you sure to logout"
          placement="top"
          okText="Yes"
          cancelText="No"
          onConfirm={(e)=>{
            e.stopPropagation()
            handleLogout()
          }}
      >
          <Avatar  className="header-avatar" size={37} icon={<LogoutOutlined/>} shape='square' >
          </Avatar>
          </Popconfirm>
      </Flex>
    </Head> 
  );
};

export default Header;
