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
import { useSelector } from "react-redux";

const Dashboard = () => {
  let navigate = useNavigate();

  let userInfo = useSelector((state) => state.user.value);

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
    userInfo.role !== "User" &&
      getItem("User", "sub1", <UserOutlined />, [
        getItem("Add User", "1", <UserAddOutlined />),
        getItem("View User", "2", <UserSwitchOutlined />),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "User" &&
      getItem("Products", "sub2", <ProductOutlined />, [
        getItem("Add Products", "/dashboard/addproduct"),
        getItem("View Product", "/dashboard/viewproduct"),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "User" &&
      getItem("Category", "sub3", <SecurityScanOutlined />, [
        getItem("Add Category", "/dashboard/addcategory"),
        getItem("View Category", "/dashboard/viewcategory"),
        getItem("Add Sub-Category", "/dashboard/addsubcategory"),
        getItem("View Sub-Category", "/dashboard/viewsubcategory"),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "User" &&
      getItem("Discount", "sub4", <SecurityScanOutlined />, [
        getItem("Add Discount", "9"),
        getItem("View Discount", "10"),
      ]),
    {
      type: "divider",
    },
    userInfo.role == "User" &&
      getItem("My Profile", "sub5", <SecurityScanOutlined />, [
        getItem("Purchase Details", "11"),
        getItem("Profile", "12"),
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
