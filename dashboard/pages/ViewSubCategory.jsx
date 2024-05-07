import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const ViewSubCategory = () => {
  let [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function allcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/category/viewsubcategory"
      );

      let allcategoryData = [];

      data.data.map((item) => {
        allcategoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
          category_name: item.categoryId.name,
        });
        console.log(item);
      });
      setCategoryList(allcategoryData);
    }
    allcategory();
  }, []);

  const dataSource = [];

  const columns = [
    {
      title: "Sub Category Name",
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
    },
  ];

  return (
    <>
      <Table dataSource={categoryList} columns={columns} />
    </>
  );
};

export default ViewSubCategory;
