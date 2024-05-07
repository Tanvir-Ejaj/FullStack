import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const ViewCategory = () => {
  let [categoryList, setCategoryList] = useState([]);
  // let [categoryId, setCategoryId] = useState("");

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
  ];

  return (
    <>
      <Table dataSource={categoryList} columns={columns} />
    </>
  );
};

export default ViewCategory;
