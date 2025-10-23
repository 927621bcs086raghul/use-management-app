import React from 'react';
import { Avatar, Flex, Layout, Popover } from 'antd';
import { ProfileOutlined, LogoutOutlined} from '@ant-design/icons';
import './Header.css'

const { Header:Head } = Layout;

const Header = () => {
  return (
    <Head className="header">
      <Flex align="center" gap={'20px'}>
      <p style={{ fontSize: '19px', color: 'hsl(0deg 0% 99.22%)',margin:"0" }}> Elon Musk</p>
          <Avatar style={{ cursor: 'pointer' }} className="header-avatar" size={37} icon={<LogoutOutlined/>} shape='square' >
          </Avatar>
      </Flex>
    </Head> 
  );
};

export default Header;
