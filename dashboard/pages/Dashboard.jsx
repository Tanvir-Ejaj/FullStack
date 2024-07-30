import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css"; // Ensure you have this CSS file

const { Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.value);

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
    userInfo.role !== "user" &&
      getItem("User", "sub1", <UserOutlined />, [
        getItem("Add User", "1", <UserAddOutlined />),
        getItem("View User", "2", <UserSwitchOutlined />),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "user" &&
      getItem("Products", "sub2", <AppstoreOutlined />, [
        getItem("Add Products", "/dashboard/addproduct"),
        getItem("View Product", "/dashboard/viewproduct"),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "user" &&
      getItem("Category", "sub3", <TagsOutlined />, [
        getItem("Add Category", "/dashboard/addcategory"),
        getItem("View Category", "/dashboard/viewcategory"),
        getItem("Add Sub-Category", "/dashboard/addsubcategory"),
        getItem("View Sub-Category", "/dashboard/viewsubcategory"),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "user" &&
      getItem("Discount", "sub4", <ShoppingCartOutlined />, [
        getItem("Add Discount", "9"),
        getItem("View Discount", "10"),
      ]),
    {
      type: "divider",
    },
    userInfo.role === "user" &&
      getItem("My Profile", "sub5", <SmileOutlined />, [
        getItem("Purchase Details", "11"),
        getItem("Profile", "12"),
      ]),
    {
      type: "divider",
    },
    getItem("Logout", "logout", <LogoutOutlined />),
  ].filter(Boolean);

  const onClick = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout className="dashboard-layout">
      <Sider width={256} className="dashboard-sider">
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="dashboard-menu"
        />
      </Sider>
      <Layout>
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
