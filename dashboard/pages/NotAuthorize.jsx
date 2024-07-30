import React from "react";
import { Row, Col, Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import "./NotAuthorized.css";

const { Title, Text } = Typography;

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="not-authorized-container">
      <Row justify="center" align="middle" className="full-height">
        <Col xs={24} sm={18} md={12} lg={24}>
          <Card className="not-authorized-card" bordered={false}>
            <div className="icon-container">
              <LockOutlined className="lock-icon" />
            </div>
            <Title level={2} className="title">
              Access Denied
            </Title>
            <Text className="description">
              You do not have permission to view this page.
            </Text>
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              className="back-button"
            >
              Go to Login
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NotAuthorized;
