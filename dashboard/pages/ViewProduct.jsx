import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const ViewProduct = () => {
  let [productList, setProductList] = useState([]);

  useEffect(() => {
    async function allproduct() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/viewproduct"
      );

      let allproductData = [];

      data.data.map((item) => {
        allproductData.push({
          key: item._id,
          name: item.name,
          image: item.image,
        });
      });
      setProductList(allproductData);
    }
    allproduct();
  }, []);

  const dataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img width="100px" src={`http://localhost:8000${record.image}`} />
      ),
    },
  ];

  return (
    <>
      <Table dataSource={productList} columns={columns} />
    </>
  );
};

export default ViewProduct;
