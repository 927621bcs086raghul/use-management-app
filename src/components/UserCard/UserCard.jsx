import React from 'react'
import { Avatar, Card, Button, Popconfirm } from "antd";
const { Meta } = Card;
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getSingleUserRequest,deleteUserRequest } from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";
import { Empty } from 'antd';
import './UserCard.css'
const UserCard = ({data}) => {
      const dispatch=useDispatch();
  const handleEdit=(id)=>{
    dispatch(getSingleUserRequest(id));
  }
  const handleDeleteUser=(id)=>{
    dispatch(deleteUserRequest(id))
  }
  return (
    <div className='card-view'>
      {(data.length ==0 )? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:
      data.map((item) => (
        <div key={item.id}>
          <Card
            hoverable
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
                onClick={()=> handleEdit(item )}
              />
              <Popconfirm
                title="Are you sure to delete this user?"
                placement="top"
                okText="Yes"
                cancelText="No"
                onConfirm={()=>
                  handleDeleteUser(item?.id)
                }
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
      ))

      }
    </div>
  )
}

export default UserCard
