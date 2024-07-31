// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import axios from "axios";

// const ViewSubCategory = () => {
//   let [categoryList, setCategoryList] = useState([]);

//   useEffect(() => {
//     async function allcategory() {
//       let data = await axios.get(
//         "http://localhost:8000/api/v1/category/viewsubcategory"
//       );

//       let allcategoryData = [];

//       data.data.map((item) => {
//         allcategoryData.push({
//           key: item._id,
//           name: item.name,
//           status: item.status,
//           category_name: item.categoryId.name,
//         });
//         console.log(item);
//       });
//       setCategoryList(allcategoryData);
//     }
//     allcategory();
//   }, []);

//   const dataSource = [];

//   const columns = [
//     {
//       title: "Sub Category Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Category Name",
//       dataIndex: "category_name",
//       key: "category_name",
//     },
//     {
//       title: "status",
//       dataIndex: "status",
//       key: "status",
//     },
//   ];

//   return (
//     <>
//       <Table dataSource={categoryList} columns={columns} />
//     </>
//   );
// };

// export default ViewSubCategory;

// UI from Chat GPT

import React, { useEffect, useState } from "react";
import { Button, Table, Space, message, Modal, Tag } from "antd";
import axios from "axios";
import "./ViewSubCategory.css"; // Create this CSS file for custom styles

const ViewSubCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/viewsubcategory"
        );

        const allCategoryData = response.data.map((item) => ({
          key: item._id,
          name: item.name,
          status: item.status,
          category_name: item.categoryId.name,
        }));

        setCategoryList(allCategoryData);
        message.success("Sub-categories loaded successfully!");
      } catch (error) {
        message.error("Failed to load sub-categories.");
        console.error("Error fetching sub-categories:", error);
      }
    }

    fetchAllCategories();
  }, [refetch]);

  const handleStatus = async (record, status) => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/v1/category/approvesubcategory",
        {
          id: record.key,
          status: record.status,
        }
      );
      message.success(`Sub-category ${status} successfully!`);
      setRefetch(!refetch);
    } catch (error) {
      message.error(`Failed to ${status} sub-category.`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this sub-category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          await axios.delete(
            `http://localhost:8000/api/v1/category/deletesubcategory/${id}`
          );
          message.success("Sub-category deleted successfully!");
          setRefetch(!refetch);
        } catch (error) {
          message.error("Failed to delete sub-category.");
          console.error("Error deleting sub-category:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "Sub-Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
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
      key: "action",
      render: (_, record) => (
        <Space>
          {record.status === "waiting" && (
            <Button onClick={() => handleStatus(record)}>Approve</Button>
          )}
          {record.status === "approved" && (
            <Button onClick={() => handleStatus(record)}>Reject</Button>
          )}
          <Button
            type="danger"
            onClick={() => handleDelete(record.key)}
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="view-sub-category-container">
      <Table
        dataSource={categoryList}
        columns={columns}
        bordered
        title={() => "Sub-Category List"}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
    </div>
  );
};

export default ViewSubCategory;
