import { Modal, Form, Input, Button, Flex } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalCloser, editUserRequest,createUserRequest } from "../../features/users/usersSlice";

const UserModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { selectedUser, modalState,loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        first_name: selectedUser.first_name || "",
        last_name: selectedUser.last_name || "",
        email: selectedUser.email || "",
        avatar: selectedUser.avatar || "",
      });
    } else {
      form.resetFields();
    }
  }, [selectedUser, form, modalState]);

  const onFinish = (values) => {
    if(selectedUser!=null){
    dispatch(editUserRequest({ id: selectedUser.id, data: values }));}
      else{
        dispatch(createUserRequest(values))
      }
  };
  return (
    <div>
      <Modal
        title={`${(selectedUser!= null)?"Edit User":" Create New User"}`}
        open={modalState}
        footer={false}
        onCancel={() => dispatch(modalCloser())}
      >
        <Form
          form={form}
          layout="vertical"
          name="new_user_form"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item label="First Name" name="first_name"
          rules={[
            { required: true, message: "Please enter first name" },
          ]}
          required>
            <Input placeholder="Please enter First name" 
            />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name"
          rules={[
            { required: true, message: "Please enter last name" },
          ]}
          required>
            <Input placeholder="Please enter Last name" />
          </Form.Item>

          <Form.Item label="Email" name="email"
          rules={[
            { required: true, message: "Please enter email" },
          ]}
          required>
            <Input placeholder=" Please enter Email" />
          </Form.Item>

          <Form.Item label="Profile Image Link" name="avatar"
          rules={[{
      pattern:/(?:data:image\/(gif|png|jpe?g|webp|bmp|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}|(?:https?:)?\/\/[^\s'"]+\.(?:png|jpe?g|gif|webp|bmp|svg)(?:\?[^\s'"]*)?)/ig,
      message: "Enter a valid image URL (jpg, jpeg, png,webp)",

    },
            { required: true, message: "Please enter image url" },

    ]} required>
            <Input placeholder="Please enter profile image link" />
          </Form.Item>

          <Flex justify="end" gap={10} className="form-buttons" >
            <Button
              type="default"
              className="cancel-button buttons"
              onClick={() => dispatch(modalCloser())}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="buttons" loading={loading}>Submit</Button>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
