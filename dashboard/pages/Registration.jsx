import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Alert,
  Typography,
  Row,
  Col,
  Space,
  message,
} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Registration = () => {
  let [loading, setLoading] = useState(false);
  let [alert, setAlert] = useState("");
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/registration",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: "tushar@1122",
          },
        }
      );

      const data = response.data;
      if (data.error) {
        message.error(data.error);
        setLoading(false);
        return;
      }

      message.success(
        "Registration Successful! Please check your email for verification."
      );
      setTimeout(() => {
        navigate(`/otpverification/${values.email}`);
      }, 1000);
    } catch (error) {
      message.error("Registration failed! Please try again.");
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={2} style={{ textAlign: "center" }}>
            Register
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
              margin: "0 auto",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
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
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
              <Link to="/login" style={{ marginRight: "10px" }}>
                Login
              </Link>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  );
};

export default Registration;
