import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeUSer } from "../src/slices/userSlice";

const Login = () => {
  let [loading, setLoading] = useState(false);
  let [alert, setAlert] = useState("");
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post("http://localhost:8000/api/v1/auth/login", {
      email: values.email,
      password: values.password,
    });
    if (!data.data.error) {
      setAlert("Login Successfull!");
      setLoading(false);
      dispatch(activeUSer(data.data));
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/dashboard");
    }else{
      setAlert("Login Unseccessfull!");
      setLoading(false);
      console.log("data.data");
    }
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
