// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Col,
//   Row,
//   message,
//   Card,
//   Typography,
//   Space,
// } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const { Title, Text } = Typography;

// const ResendOtp = () => {
//   const [form] = Form.useForm();
//   let [loading, setLoading] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();
//   let navigate = useNavigate();

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       let { data } = await axios.post(
//         "http://localhost:8000/api/v1/auth/resendotp",
//         {
//           email: values.email,
//         }
//       );
//       if (data.error) {
//         messageApi.open({
//           type: "error",
//           content: data.error,
//         });
//       } else {
//         messageApi.open({
//           type: "success",
//           content: data.success,
//         });
//         setTimeout(() => {
//           navigate(`/otpverification/${values.email}`);
//         }, 3000);
//       }
//     } catch (error) {
//       messageApi.open({
//         type: "error",
//         content: "An unexpected error occurred",
//       });
//     } finally {
//       setLoading(false);
//       form.resetFields();
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <>
//       {contextHolder}
//       <Row
//         justify="center"
//         align="middle"
//         style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
//       >
//         <Col>
//           <Card
//             style={{
//               width: 400,
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               borderRadius: "8px",
//             }}
//           >
//             <Space
//               direction="vertical"
//               style={{ width: "100%", alignItems: "center" }}
//             >
//               <Title level={3}>Resend OTP</Title>
//               <Text type="secondary">Enter your email to resend the OTP</Text>
//             </Space>
//             <Form
//               form={form}
//               name="basic"
//               layout="vertical"
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               style={{ marginTop: 20 }}
//             >
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter your email!",
//                   },
//                   {
//                     type: "email",
//                     message: "Please enter a valid email!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   disabled={loading}
//                   style={{ width: "100%" }}
//                 >
//                   Resend OTP
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ResendOtp;

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Card,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ResendOtp = () => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let { data, status } = await axios.post(
        "http://localhost:8000/api/v1/auth/resendotp",
        {
          email: values.email,
        }
      );

      if (status === 200) {
        messageApi.open({
          type: "success",
          content: data.success,
        });
        setTimeout(() => {
          navigate(`/otpverification/${values.email}`);
        }, 3000);
      } else {
        messageApi.open({
          type: "error",
          content: data.error,
        });
      }
    } catch (error) {
      if (error.response) {
        messageApi.open({
          type: "error",
          content: error.response.data.error || "An unexpected error occurred",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "An unexpected error occurred",
        });
      }
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <Col>
          <Card
            style={{
              width: 400,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Space
              direction="vertical"
              style={{ width: "100%", alignItems: "center" }}
            >
              <Title level={3}>Resend OTP</Title>
              <Text type="secondary">Enter your email to resend the OTP</Text>
            </Space>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ marginTop: 20 }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                  style={{ width: "100%" }}
                >
                  Resend OTP
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ResendOtp;
