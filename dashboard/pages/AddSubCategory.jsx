import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import "./AddSubCategory.css"; // Create this CSS file for custom styles

const AddSubCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/category/createsubcategory",
        {
          name: values.name,
          categoryId: categoryId,
        }
      );
      form.resetFields();
      message.success("Sub-Category created successfully!");
      console.log(response.data);
    } catch (error) {
      message.error("Failed to create Sub-Category!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Failed to submit the form. Please check the input.");
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/viewallcategory"
        );
        const allCategories = response.data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setCategoryList(allCategories);
      } catch (error) {
        message.error("Failed to fetch categories.");
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchAllCategories();
  }, []);

  const handleChange = (value) => {
    setCategoryId(value);
  };

  return (
    <div className="add-sub-category-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder="Select a category"
            onChange={handleChange}
            options={categoryList}
          />
        </Form.Item>
        <Form.Item
          label="Sub-Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input Sub-Category Name!" },
          ]}
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSubCategory;
