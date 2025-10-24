import { Modal, Form, Input, Button, Flex, Drawer } from "antd";
import React from "react";
import './UserDrawer.css'
const UserDrawer = () => {
const [form] = Form.useForm();

  return (
    <div>
      <Drawer title="Create New User" open>
        <Form form={form} layout="vertical" name="new_user_form" preserve={false}>
          <Flex vertical className="drawer-flex">
            <Flex vertical>
          <Form.Item label="First Name" name="first_name" required>
            <Input placeholder="Please enter first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name" required>
            <Input placeholder="Please enter last name" />
          </Form.Item>

          <Form.Item label="Email" name="email" required>
            <Input placeholder="Please enter Email" className="email-input-field" />
          </Form.Item>

          <Form.Item label="Profile image link" name ='avatar'required>
            <Input placeholder="Please enter profile image link"/>
          </Form.Item>
</Flex>
          <Flex justify="end" gap={10} className="form-buttons">
            <Button type="default" className="cancel-button">
              Cancel
            </Button>
            <Button type="primary">Add</Button>
          </Flex>
          </Flex>
        </Form>
      </Drawer>
    </div>
  );
};
export default UserDrawer
