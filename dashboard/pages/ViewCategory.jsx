import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Tag,
  Modal,
  Space,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import axios from "axios";
import "./ViewCategory.css";
const { Title } = Typography;

const ViewCategory = () => {
  let [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const showModal = (record) => {
    setIsModalOpen(true);
    setInitialValues([
      {
        name: ["name"],
        value: record.name,
      },
    ]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/v1/category/editcategory", {
        oldName: initialValues[0].value,
        name: values.name,
      });
      message.success("Category updated successfully!");
      setRefetch(!refetch);
      handleOk();
    } catch (error) {
      message.error("Failed to update category!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function allcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/category/viewallcategory"
      );

      let allcategoryData = [];

      data.data.map((item) => {
        allcategoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
        });
      });
      setCategoryList(allcategoryData);
    }
    allcategory();
  }, [refetch]);

  let handleStatus = async (record) => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/category/approvecategory",
      {
        id: record.key,
        status: record.status,
      }
    );
    setRefetch(!refetch);
  };

  let handleDelete = async (id) => {
    let data = await axios.delete(
      ` http://localhost:8000/api/v1/category/deletecategory/${id}`
    );
    setRefetch(!refetch);
  };

  const dataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "approved" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Space>
            {record.status === "waiting" && (
              <Button onClick={() => handleStatus(record)}>Approve</Button>
            )}
            {record.status === "approved" && (
              <Button onClick={() => handleStatus(record)}>Reject</Button>
            )}
            <Button onClick={() => handleDelete(record.key)} danger>
              Delete
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                fields={initialValues}
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
                  label="Category Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Update Category Name!",
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
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Button type="primary" onClick={() => showModal(record)}>
              Edit
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      {/* <Table dataSource={categoryList} columns={columns} /> */}
      <div className="view-category-container">
        <Title level={2} className="view-category-title">
          Category Management
        </Title>
        <Table dataSource={categoryList} columns={columns} />
        <Modal
          title="Edit Category"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            fields={initialValues}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: "Update Category Name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ViewCategory;
