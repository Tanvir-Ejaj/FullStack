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
        let details = item.description;
        const oembedRegex = /<oembed[^>]*>/g;
        const oembedMatch = details?.match(oembedRegex);
        if (oembedMatch) {
          const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
          oembedUrl.replace("watch", "embed");
          const iframeElement = `<iframe width="100" height="100" src="https://www.youtube.com/embed/${
            oembedUrl.split("v=")[1].split("&")[0]
          }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          details = details?.replace(oembedRegex, iframeElement);
        }
        allproductData.push({
          key: item._id,
          name: item.name,
          image: item.image,
          description: details,
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
    {
      title: "Description",
      dataIndex: "description",
      key: "descriptionimage",
      render: (_, record) => (
        <div dangerouslySetInnerHTML={{ __html: record.description }}></div>
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
