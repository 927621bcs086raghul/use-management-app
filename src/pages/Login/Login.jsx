import React, { useEffect } from "react";
import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading}= useSelector((state)=> state.auth);
  const onFinish = (values) => {
    dispatch(loginRequest({email:values.email,password:values.password}))
  };
  const token=localStorage.getItem("token");
  useEffect(()=>{
    if(token!=undefined){
        navigate('/mainLayout')
    }
  },[token])
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
          <Input prefix={<UserOutlined />}  className="login-input-field" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} className="login-input-field" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button" loading={loading} block>
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default Login;
