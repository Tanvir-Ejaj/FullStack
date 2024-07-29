import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";

const { Title } = Typography;

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/otpverification",
        {
          email: params.email,
          otp: values.otp,
        }
      );

      const data = response.data;

      if (data.error) {
        message.error("OTP Not Match");
        setAlert("OTP Not Match");
      } else {
        message.success("Verification Successful!");
        setAlert("Verification Successful!");
        setTimeout(() => {
          navigate(`/login`);
        }, 1500);
      }
    } catch (error) {
      message.error("Verification failed! Please try again.");
      setLoading(false);
    }
    setLoading(false);
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
            OTP Verification
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
          >
            <Form.Item
              label="Code"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
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
              <Button
                type="link"
                onClick={() => navigate("/resendotp")}
                className="forget-password-link"
              >
                Resend OTP
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  );
};

export default OtpVerification;
