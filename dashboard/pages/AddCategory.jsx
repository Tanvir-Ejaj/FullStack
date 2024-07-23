import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import "./AddCategory.css"; // Create this CSS file for custom styles

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/category/createcategory",
        { name: values.name }
      );
      form.resetFields();
      message.success("Category created successfully!");
      console.log(response.data);
    } catch (error) {
      message.error("Failed to create category!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="add-category-container">
      <Form
        form={form}
        name="add-category"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please input Category Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
    </div>
  );
};

export default AddCategory;
