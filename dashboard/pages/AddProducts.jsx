// import React, { useState } from "react";
// import { Button, Checkbox, Form, Input } from "antd";
// import axios from "axios";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const AddProducts = () => {
//   let [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   let [image, setImage] = useState({});
//   let [description, setDescription] = useState("");

//   const onFinish = async (values) => {
//     let data = await axios.post(
//       "http://localhost:8000/api/v1/product/createproduct",
//       {
//         name: values.name,
//         avatar: image,
//         description: description,
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     form.resetFields();
//     console.log(data.data);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   let handleUpload = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <>
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         form={form}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item>
//           <input type="file" onChange={handleUpload} />
//         </Form.Item>
//         <Form.Item
//           label="Add Products"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: "Add Your Products!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <CKEditor
//           editor={ClassicEditor}
//           data=""
//           onReady={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             setDescription(editor.getData());
//           }}
//           onBlur={(event, editor) => {
//             console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log("Focus.", editor);
//           }}
//         />
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             disabled={loading}
//           >
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default AddProducts;


import React, { useState } from "react";
import { Button, Form, Input, Card, Typography, Space, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Title } = Typography;

const AddProducts = () => {
  let [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let [image, setImage] = useState(null);
  let [description, setDescription] = useState("");
  let [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      {
        name: values.name,
        avatar: image,
        description: description,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    form.resetFields();
    setFileList([]);
    setImage(null);
    setDescription("");
    setLoading(false);
    message.success('Product added successfully!');
    console.log(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setImage(fileList[0].originFileObj);
    } else {
      setImage(null);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%', alignItems: 'center', marginTop: '50px' }}>
      <Card
        style={{
          width: 600,
          padding: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Add New Product
        </Title>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Product Image"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              maxCount={1}
              beforeUpload={() => false}
              onRemove={() => {
                setImage(null);
                setFileList([]);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the product name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                setDescription(editor.getData());
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
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

export default AddProducts;

