import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const AddProducts = () => {
  let [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let [image, setImage] = useState({});

  const onFinish = async (values) => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      {
        name: values.name,
        avatar: image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    form.resetFields();
    console.log(data.data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
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
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <input type="file" onChange={handleUpload} />
        </Form.Item>
        <Form.Item
          label="Add Products"
          name="name"
          rules={[
            {
              required: true,
              message: "Add Your Products!",
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

export default AddProducts;
