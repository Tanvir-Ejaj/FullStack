import React, { useState } from "react";
import { Button, Form, Input, Alert, Card, Typography, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
    }, 2000);
    console.log(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", alignItems: "center", marginTop: "50px" }}
    >
      {alert && <Alert message={alert} type="success" showIcon closable />}
      <Card
        style={{
          width: 400,
          padding: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Forgot Password
        </Title>
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
              {
                type: "email",
                message: "The input is not valid E-mail!",
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
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default ForgetPassword;
