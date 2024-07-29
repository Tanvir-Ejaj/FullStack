import React, { useState } from "react";
import { Button, Form, Input, message, Typography, Row, Col, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeUSer } from "../src/slices/userSlice";
import "./Login.css"; // Custom styles

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (data.error) {
        if (data.error === "Please Verify Your email") {
          message.warning("Please verify your email before logging in.");
          setTimeout(() => {
            navigate(`/otpverification/${values.email}`);
          }, 2000);
        } else {
          message.error(data.error || "Login Unsuccessful!");
        }
      } else {
        message.success(data.success || "Login Successful!");
        dispatch(activeUSer(data));
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      message.error("Login Unsuccessful!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Row justify="center" align="middle" className="login-row">
        <Col>
          <Card className="login-card">
            <Title level={2} className="login-title">
              Login
            </Title>
            <Form
              name="login-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                  block
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="link"
                  onClick={() => navigate("/forgetpassword")}
                  className="forget-password-link"
                >
                  Forgot Password?
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
