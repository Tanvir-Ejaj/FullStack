import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";

const Login = () => {
  let [loading, setLoading] = useState(false);
  let [alert, setAlert] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setAlert("Login Successfull!");
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      {
        email: values.email,
        password: values.password,
      },
    );
    setLoading(false);
    console.log(data.data.success);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {alert && <Alert message={alert} type="success" showIcon closable />}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
