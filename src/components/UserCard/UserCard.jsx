import React from 'react'
import { Avatar, Card, Button, Popconfirm } from "antd";
const { Meta } = Card;
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import './UserCard.css'
const UserCard = ({data}) => {
    
  return (
    <div className='card-view'>
      {data.map((item) => (
        <div key={item.id}>
          <Card
            hoverable
            style={{ width: "250px" }}
            cover={<Avatar className="avatar-card" src={item.avatar} size="large" />}
            className="card-with-hover"
          >
            <Meta
              title={`${item.first_name} ${item.last_name}`}
              style={{ textAlign: "center" }}
              description={item.email}
            />
            <div className="hover-buttons">
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="hover-button"
              />
              <Popconfirm
                title="Are you sure to delete this user?"
                placement="top"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="hover-button"
                />
              </Popconfirm>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default UserCard
