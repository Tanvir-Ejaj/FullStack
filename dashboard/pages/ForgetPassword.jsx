// ** main
// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Alert,
//   Card,
//   Typography,
//   Space,
//   message,
// } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;

// const ForgetPassword = () => {
//   let [loading, setLoading] = useState(false);
//   let navigate = useNavigate();
//   let [alert, setAlert] = useState("");

//   const onFinish = async (values) => {
//     setLoading(true);
//     let { data } = await axios.post(
//       "http://localhost:8000/api/v1/auth/forgetpassword",
//       {
//         email: values.email,
//       }
//     );
//     if (data.error) {
//       setLoading(false);
//       message.error(data.error);
//     } else {
//       setLoading(false);
//       setAlert(data.success);
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//     setLoading(false);
//   };

//   return (
//     <Space
//       direction="vertical"
//       style={{ width: "100%", alignItems: "center", marginTop: "50px" }}
//     >
//       {alert && <Alert message={alert} type="success" showIcon closable />}
//       <Card
//         style={{
//           width: 400,
//           padding: 20,
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           borderRadius: "8px",
//         }}
//       >
//         <Title level={3} style={{ textAlign: "center" }}>
//           Forgot Password
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
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your Email!",
//               },
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!",
//               },
//             ]}
//           >
//             <Input />
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

// export default ForgetPassword;


// ** proper error management
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Alert,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ForgetPassword = () => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [alert, setAlert] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/forgetpassword",
        { email: values.email }
      );
      if (data.error) {
        message.error(data.error);
      } else {
        setAlert(data.success);
        setTimeout(() => {
          setAlert("");
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", alignItems: "center", marginTop: "50px" }}
    >
      {alert && (
        <Alert
          message={alert}
          type="success"
          showIcon
          closable
          style={{ marginBottom: "20px" }}
        />
      )}
      <Card
        style={{
          width: 400,
          padding: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Forgot Password
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
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
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

export default ForgetPassword;

