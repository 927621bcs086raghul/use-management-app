import { Modal, Form, Input, Button, Flex } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalCloser, editUserRequest } from "../../features/users/usersSlice";

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
    dispatch(editUserRequest({ id: selectedUser.id, data: values }));
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
          <Form.Item label="First Name" name="first_name" required>
            <Input placeholder="First name" />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name" required>
            <Input placeholder="Last name" />
          </Form.Item>

          <Form.Item label="Email" name="email" required>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Profile Image Link" name="avatar" required>
            <Input placeholder="Image Url" />
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
