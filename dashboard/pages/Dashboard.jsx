import React from "react";
import {
  SecurityScanOutlined,
  ProductOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu, Col, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Add User", "1", <UserAddOutlined />),
      getItem("View User", "2", <UserSwitchOutlined />),
    ]),
    {
      type: "divider",
    },
    getItem("Products", "sub2", <ProductOutlined />, [
      getItem("Add Products", "3"),
      getItem("View Product", "4"),
    ]),
    {
      type: "divider",
    },
    getItem("Category", "sub3", <SecurityScanOutlined />, [
      getItem("Add Category", "/dashboard/addcategory"),
      getItem("View Category", "/dashboard/viewcategory"),
      getItem("Add Sub-Category", "/dashboard/addsubcategory"),
      getItem("View Sub-Category", "/dashboard/viewsubcategory"),
    ]),
    {
      type: "divider",
    },
    getItem("Discount", "sub4", <SecurityScanOutlined />, [
      getItem("Add Discount", "9"),
      getItem("View Discount", "10"),
    ]),
    {
      type: "divider",
    },
  ];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Row>
        <Col span={4}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={18}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
