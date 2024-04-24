import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const AddCategory = () => {
  let [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/products/createcategory",
      {
        name: values.name,
      }
    );
    form.resetFields();
    console.log(data.data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <Form.Item
          label="Create Category"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Category Name!",
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

export default AddCategory;
