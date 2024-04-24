import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";

const AddSubCategory = () => {
  let [categoryList, setCategoryList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [categoryId, setCategoryId] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/products/createsubcategory",
      {
        name: values.name,
        categoryId: categoryId,
      }
    );
    form.resetFields();
    console.log(data.data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function allcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/products/viewallcategory"
      );
      let allcategoryData = [];

      data.data.map((item) => {
        allcategoryData.push({
          value: item._id,
          label: item.name,
        });
      });
      setCategoryList(allcategoryData);
    }
    allcategory();
  }, []);

  const handleChange = (value) => {
    setCategoryId(value);
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
          <Select
            defaultValue={categoryList}
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={categoryList}
          />
        </Form.Item>
        <Form.Item
          label="Sub Create Category"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Sub-Category Name!",
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddSubCategory;
