import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [alert, setAlert] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/forgetpassword",
      {
        email: values.email,
      }
    );
    setLoading(false);
    setAlert("Please Check Your Email");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    console.log(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
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

export default ForgetPassword;
