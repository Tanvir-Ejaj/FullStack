// import React, { useState } from "react";
// import { Button, Form, Input, Card, Typography, Space } from "antd";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const { Title } = Typography;

// const NewPassword = () => {
//   let navigate = useNavigate();
//   let params = useParams();
//   let [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     let data = await axios.post(
//       "http://localhost:8000/api/v1/auth/newpassword",
//       {
//         password: values.password,
//         token: params.token,
//       }
//     );
//     console.log("Success:", data);
//     setLoading(false);
//     navigate("/login");
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <Space
//       direction="vertical"
//       style={{ width: "100%", alignItems: "center", marginTop: "50px" }}
//     >
//       <Card
//         style={{
//           width: 400,
//           padding: 20,
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           borderRadius: "8px",
//         }}
//       >
//         <Title level={3} style={{ textAlign: "center" }}>
//           Set New Password
//         </Title>
//         <Form
//           name="basic"
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Input a new password",
//               },
//               {
//                 min: 6,
//                 message: "Password must be at least 6 characters long",
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item
//             wrapperCol={{
//               offset: 8,
//               span: 16,
//             }}
//           >
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               disabled={loading}
//               style={{ width: "100%" }}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </Space>
//   );
// };

// export default NewPassword;

import React, { useState } from "react";
import { Button, Form, Input, Card, Typography, Space, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const NewPassword = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/newpassword",
        {
          password: values.password,
          token: params.token,
        }
      );
      message.success(data.success);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", alignItems: "center", marginTop: "50px" }}
    >
      <Card
        style={{
          width: 400,
          padding: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Set New Password
        </Title>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Input a new password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default NewPassword;
