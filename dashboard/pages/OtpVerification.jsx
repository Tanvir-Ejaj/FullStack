import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Alert } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  let [loading, setLoading] = useState(false);
  let [alert, setAlert] = useState("");
  let params = useParams();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setAlert("Verification Successfull!");
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/otpverification",
      {
        email: params.email,
        otp: values.otp,
      }
    );
    setLoading(false);
    setTimeout(() => {
      navigate(`/login/${params.email}`);
    }, 15000);
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
          label="Code"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your otp!",
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

export default OtpVerification;
