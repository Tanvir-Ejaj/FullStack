import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import axios from "axios";

const ViewCategory = () => {
  let [categoryList, setCategoryList] = useState([]);
  // let [categoryId, setCategoryId] = useState("");

  let handleStatus = async (record) => {
    console.log(record);

    let data = await axios.post(
      "http://localhost:8000/api/v1/category/approvecategory",
      {
        id: record.key,
        status: record.status,
      }
    );
    console.log(data);
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
  }, []);

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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => handleStatus(record)}>
            {record.status == "waiting" ? "Approve" : "Reject"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={categoryList} columns={columns} />
    </>
  );
};

export default ViewCategory;
