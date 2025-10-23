import React from "react";
import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../features/auth/authSlice";
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginRequest({email:values.email,password:values.password}))
  };

  return (
    
    <div className="login-page">
        <div className="login-credentials">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        className="login-form"
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input prefix={<UserOutlined />}  className="login-input-field" placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} className="login-input-field" placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default Login;
